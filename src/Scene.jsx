import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sparkles, Stars } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { scrollState } from './scroll'

const NOISE = /* glsl */ `
float hash(vec3 p){p=fract(p*0.3183099+.1);p*=17.0;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
float noise(vec3 x){vec3 i=floor(x);vec3 f=fract(x);f=f*f*(3.0-2.0*f);
 return mix(mix(mix(hash(i+vec3(0,0,0)),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
 mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}
float fbm(vec3 p){float v=0.;float a=.5;for(int i=0;i<5;i++){v+=a*noise(p);p*=2.02;a*=.5;}return v;}
`

const planetVert = /* glsl */ `
varying vec3 vPos; varying vec3 vN; varying vec3 vView;
void main(){
  vPos = position;
  vN = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(position,1.0);
  vView = mv.xyz;
  gl_Position = projectionMatrix * mv;
}`

const planetFrag = /* glsl */ `
${NOISE}
varying vec3 vPos; varying vec3 vN; varying vec3 vView;
uniform vec3 c1; uniform vec3 c2; uniform vec3 c3; uniform vec3 uRim;
uniform float uTime; uniform float uBands; uniform float uClouds; uniform float uRadius;
void main(){
  vec3 p = vPos / uRadius;
  float n = fbm(p*2.4 + vec3(uTime*.015,0.,0.));
  vec3 col = mix(c1, c2, smoothstep(.25,.75,n));
  float b = sin(p.y*uBands + n*5.0)*.5+.5;
  col = mix(col, c3, b*step(.01,uBands)*.55);
  float cl = smoothstep(.52,.85,fbm(p*4.2 + vec3(uTime*.03,uTime*.01,0.)))*uClouds;
  col = mix(col, vec3(1.), cl*.75);
  vec3 L = normalize(vec3(.75,.45,.6));
  float d = max(dot(vN,L),0.);
  float fres = pow(1.-max(dot(vN,normalize(-vView)),0.),3.);
  col = col*(.07 + d*1.15) + uRim*fres*(.25+d*.9);
  gl_FragColor = vec4(col,1.);
}`

const atmoVert = /* glsl */ `
varying vec3 vN;
void main(){ vN = normalize(normalMatrix*normal); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }`
const atmoFrag = /* glsl */ `
varying vec3 vN; uniform vec3 uColor;
void main(){ float i = pow(max(.68 - dot(vN, vec3(0.,0.,1.)),0.), 3.5); gl_FragColor = vec4(uColor, 1.) * i * 2.2; }`

const ringVert = /* glsl */ `varying vec3 vPos; void main(){ vPos=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`
const ringFrag = /* glsl */ `
${NOISE}
varying vec3 vPos; uniform vec3 uColor; uniform float uIn; uniform float uOut;
void main(){
  float r = length(vPos.xy);
  float t = (r-uIn)/(uOut-uIn);
  float bands = .5+.5*sin(t*70.+noise(vec3(t*20.,0.,0.))*6.);
  float a = smoothstep(0.,.08,t)*smoothstep(1.,.85,t)*(.25+.55*bands);
  gl_FragColor = vec4(uColor*(.7+.6*bands), a);
}`

function Planet({ position, radius = 3, colors, rim = '#7aa2ff', atmo = '#4d7bff', bands = 0, clouds = 0, ring, spin = 0.04, children }) {
  const mesh = useRef()
  const uniforms = useMemo(() => ({
    uTime: { value: 0 }, uBands: { value: bands }, uClouds: { value: clouds }, uRadius: { value: radius },
    c1: { value: new THREE.Color(colors[0]) }, c2: { value: new THREE.Color(colors[1]) }, c3: { value: new THREE.Color(colors[2] || colors[0]) },
    uRim: { value: new THREE.Color(rim) }
  }), [])
  const atmoU = useMemo(() => ({ uColor: { value: new THREE.Color(atmo) } }), [])
  const ringU = useMemo(() => ring && ({ uColor: { value: new THREE.Color(ring.color) }, uIn: { value: radius * 1.35 }, uOut: { value: radius * 2.3 } }), [])
  useFrame((s, dt) => { uniforms.uTime.value = s.clock.elapsedTime; mesh.current.rotation.y += dt * spin })
  return (
    <group position={position}>
      <mesh ref={mesh}>
        <sphereGeometry args={[radius, 96, 96]} />
        <shaderMaterial vertexShader={planetVert} fragmentShader={planetFrag} uniforms={uniforms} />
      </mesh>
      <mesh scale={1.16}>
        <sphereGeometry args={[radius, 64, 64]} />
        <shaderMaterial vertexShader={atmoVert} fragmentShader={atmoFrag} uniforms={atmoU}
          side={THREE.BackSide} blending={THREE.AdditiveBlending} transparent depthWrite={false} />
      </mesh>
      {ring && (
        <mesh rotation={ring.tilt}>
          <ringGeometry args={[radius * 1.35, radius * 2.3, 160, 1]} />
          <shaderMaterial vertexShader={ringVert} fragmentShader={ringFrag} uniforms={ringU}
            side={THREE.DoubleSide} transparent depthWrite={false} />
        </mesh>
      )}
      {children}
    </group>
  )
}

function Moon({ orbit = 5.2, size = 0.55, speed = 0.25 }) {
  const g = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed
    g.current.position.set(Math.cos(t) * orbit, Math.sin(t * 0.6) * 0.9, Math.sin(t) * orbit)
  })
  return (
    <group ref={g}>
      <mesh>
        <icosahedronGeometry args={[size, 3]} />
        <meshStandardMaterial color="#b9b9c4" roughness={1} flatShading />
      </mesh>
    </group>
  )
}

function Belt({ position, count = 280 }) {
  const grp = useRef(), inst = useRef()
  const geo = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(1, 1)
    const pos = g.attributes.position
    const v = new THREE.Vector3()
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i)
      const k = 1 + 0.32 * Math.sin(v.x * 5.1 + v.y * 3.7) * Math.sin(v.z * 4.3 + v.x * 2.1)
      pos.setXYZ(i, v.x * k, v.y * k, v.z * k)
    }
    g.computeVertexNormals()
    return g
  }, [])
  const data = useMemo(() => Array.from({ length: count }, () => {
    const a = Math.random() * 6.283, r = 5 + Math.random() * 11
    return { x: Math.cos(a) * r, y: Math.sin(a) * r * 0.75, z: (Math.random() - 0.5) * 34,
      s: 0.15 + Math.random() ** 3 * 1.2, rx: Math.random() * 6, ry: Math.random() * 6, vr: (Math.random() - 0.5) * 0.7 }
  }), [count])
  const dummy = useMemo(() => new THREE.Object3D(), [])
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    data.forEach((d, i) => {
      dummy.position.set(d.x, d.y, d.z)
      dummy.rotation.set(d.rx + t * d.vr, d.ry + t * d.vr * 0.7, 0)
      dummy.scale.setScalar(d.s)
      dummy.updateMatrix()
      inst.current.setMatrixAt(i, dummy.matrix)
    })
    inst.current.instanceMatrix.needsUpdate = true
    grp.current.rotation.z = t * 0.03
  })
  return (
    <group ref={grp} position={position}>
      <instancedMesh ref={inst} args={[geo, undefined, count]}>
        <meshStandardMaterial color="#8b7f78" roughness={0.95} flatShading />
      </instancedMesh>
    </group>
  )
}

function Station({ position }) {
  const g = useRef()
  useFrame((_, dt) => { g.current.rotation.y += dt * 0.25; g.current.rotation.z += dt * 0.05 })
  const metal = { color: '#c9d2ff', metalness: 0.9, roughness: 0.25 }
  return (
    <group position={position} ref={g} scale={1.4}>
      <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.28, 0.28, 3.2, 20]} /><meshStandardMaterial {...metal} /></mesh>
      <mesh><torusGeometry args={[1.5, 0.07, 12, 64]} /><meshStandardMaterial {...metal} /></mesh>
      <mesh><sphereGeometry args={[0.45, 24, 24]} /><meshStandardMaterial color="#7c5cff" emissive="#7c5cff" emissiveIntensity={1.2} /></mesh>
      {[-1, 1].map(s => (
        <mesh key={s} position={[s * 1.1, 0, 0]}>
          <boxGeometry args={[1.6, 0.04, 1.4]} />
          <meshStandardMaterial color="#1c3fb8" emissive="#2a6bff" emissiveIntensity={0.6} metalness={0.6} roughness={0.3} />
        </mesh>
      ))}
      <mesh position={[0, 0, 1.7]}><sphereGeometry args={[0.07, 8, 8]} /><meshBasicMaterial color={new THREE.Color(4, 0.4, 0.4)} toneMapped={false} /></mesh>
      <mesh position={[0, 0, -1.7]}><sphereGeometry args={[0.07, 8, 8]} /><meshBasicMaterial color={new THREE.Color(0.4, 4, 0.8)} toneMapped={false} /></mesh>
    </group>
  )
}

function Sun({ position }) {
  const g = useRef()
  useFrame(({ clock }) => { g.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 0.8) * 0.02) })
  return (
    <group position={position} ref={g}>
      <mesh><sphereGeometry args={[9, 48, 48]} /><meshBasicMaterial color={new THREE.Color(4, 2.2, 0.7)} toneMapped={false} /></mesh>
      <mesh scale={1.35}><sphereGeometry args={[9, 32, 32]} /><meshBasicMaterial color={new THREE.Color(1.2, 0.5, 0.15)} transparent opacity={0.25} toneMapped={false} depthWrite={false} /></mesh>
      <pointLight intensity={400} distance={120} color="#ffb347" />
    </group>
  )
}

function Shooters({ count = 5 }) {
  const camera = useThree(s => s.camera)
  const refs = useRef([])
  const st = useRef(Array.from({ length: count }, () => ({ wait: Math.random() * 4, life: 0, x: 0, y: 0, z: 0 })))
  useFrame((_, dt) => {
    st.current.forEach((s, i) => {
      const m = refs.current[i]; if (!m) return
      if (s.wait > 0) { s.wait -= dt; m.visible = false; if (s.wait <= 0) {
        s.life = 1.1; s.x = (Math.random() - 0.2) * 45; s.y = 8 + Math.random() * 14; s.z = camera.position.z - 30 - Math.random() * 40
      } return }
      s.life -= dt; m.visible = true
      s.x -= dt * 55; s.y -= dt * 22
      m.position.set(s.x, s.y, s.z)
      m.scale.x = Math.max(0.01, s.life)
      if (s.life <= 0) { s.wait = 2 + Math.random() * 5 }
    })
  })
  return Array.from({ length: count }, (_, i) => (
    <mesh key={i} ref={el => (refs.current[i] = el)} rotation={[0, 0, Math.atan2(22, 55)]} visible={false}>
      <boxGeometry args={[7, 0.05, 0.05]} />
      <meshBasicMaterial color={new THREE.Color(3, 3.4, 5)} toneMapped={false} />
    </mesh>
  ))
}

function Rig() {
  const camera = useThree(s => s.camera)
  const sm = useRef({ p: 0, mx: 0, my: 0 })
  useFrame((_, dt) => {
    const s = sm.current
    s.p = THREE.MathUtils.damp(s.p, scrollState.p, 2.6, dt)
    s.mx = THREE.MathUtils.damp(s.mx, scrollState.mx, 2, dt)
    s.my = THREE.MathUtils.damp(s.my, scrollState.my, 2, dt)
    const p = s.p
    const z = 12 - p * 140
    const x = Math.sin(p * 5.5) * 1.9 + s.mx * 1.1
    const y = Math.cos(p * 4) * 0.8 + s.my * 0.6
    camera.position.set(x, y, z)
    camera.lookAt(x * 0.35 - s.mx * 0.5, y * 0.35 + s.my * 0.3, z - 20)
    camera.rotateZ(Math.sin(p * 7) * 0.06 - s.mx * 0.02)
  })
  return null
}

function Sky() {
  const g = useRef()
  const camera = useThree(s => s.camera)
  useFrame(() => { g.current.position.z = camera.position.z * 0.92 })
  return (
    <group ref={g}>
      <Stars radius={110} depth={90} count={7000} factor={5} saturation={0.4} fade speed={0.6} />
    </group>
  )
}

function Far({ z, from, to, children }) {
  const g = useRef()
  const camera = useThree(s => s.camera)
  useFrame(() => {
    const d = camera.position.z - z
    const t = THREE.MathUtils.clamp((from - d) / (from - to), 0, 1)
    const k = t * t * (3 - 2 * t)
    g.current.visible = k > 0.01
    g.current.scale.setScalar(Math.max(k, 0.001))
  })
  return <group ref={g} position={[0, 0, z]}>{children}</group>
}

function World() {
  const mobile = useThree(s => s.size.width < 820)
  return (
    <>
      <color attach="background" args={['#07080c']} />
      <fog attach="fog" args={['#07080c', 60, 220]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[8, 5, 6]} intensity={2.4} color="#fff2e0" />
      <Rig />
      <Sky />
      <Sparkles count={600} scale={[46, 28, 170]} position={[0, 0, -70]} size={3.2} speed={0.35} color="#9fb4ff" opacity={0.8} />
      <Shooters />

      {/* Hero planet */}
      <Planet position={mobile ? [0.6, 3.2, -6] : [0, -6.2, -4]} radius={mobile ? 2.4 : 4.2}
        colors={['#0d3b8a', '#2a8f6a', '#c9a15a']} rim="#6fb4ff" atmo="#3f86ff" clouds={0.9} bands={0} spin={0.05}>
        <Moon orbit={mobile ? 4.6 : 5.6} />
      </Planet>

      <Far z={-42} from={50} to={34}><Belt position={[0, 0, 0]} /></Far>

      {/* Ringed red giant */}
      <Far z={-78} from={72} to={50}><Planet position={[-8.5, 1.5, 0]} radius={4.2} colors={['#7a1f12', '#d4552a', '#f2b27a']} rim="#ff8a5c" atmo="#ff5a2a"
        bands={14} spin={0.03} ring={{ color: '#f1d3a6', tilt: [Math.PI / 2.35, 0.2, 0.35] }} /></Far>

      {/* Ice world + station */}
      <Far z={-108} from={72} to={50}><Planet position={[7, -2, 0]} radius={2.8} colors={['#bfe4ff', '#6fa8e8', '#ffffff']} rim="#bfe9ff" atmo="#7ecbff" bands={9} clouds={0.6} spin={0.06} /></Far>
      <Far z={-118} from={62} to={44}><Station position={[-4.2, 1.6, 0]} /></Far>

      <Far z={-185} from={110} to={75}><Sun position={[0, 3, 0]} /></Far>

      <EffectComposer multisampling={0}>
        <Bloom intensity={0.6} luminanceThreshold={0.75} luminanceSmoothing={0.2} mipmapBlur />
        <Vignette eskil={false} offset={0.2} darkness={0.9} />
      </EffectComposer>
    </>
  )
}

export default function Scene() {
  return (
    <div className="scene" aria-hidden="true">
      <Canvas dpr={[1, 1.75]} camera={{ fov: 55, near: 0.1, far: 500, position: [0, 0, 12] }}
        gl={{ antialias: false, powerPreference: 'high-performance' }}>
        <World />
      </Canvas>
    </div>
  )
}
