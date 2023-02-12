void main() {
    float strength = 0.15 / (distance(vec2(gl_PointCoord.x, ((1.0 - gl_PointCoord.y) - 0.5) * 5.0 + 0.5), vec2(0.5)));
    strength *= 0.15 / (distance(vec2((1.0 - gl_PointCoord.y), (gl_PointCoord.x - 0.5) * 5.0 + 0.5), vec2(0.5)));

    gl_FragColor = vec4(strength, strength, strength, strength);
}