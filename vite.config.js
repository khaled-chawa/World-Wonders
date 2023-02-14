import glsl from 'vite-plugin-glsl';

export default {
    root: './src',
    publicDir: './public',
    build: {
        outDir: '../dist'
    },
    plugins: [glsl()]
}

glsl({
    exclude: undefined,                         // File paths/extensions to ignore
    include: /\.(glsl|wgsl|vert|frag|vs|fs)$/i, // File paths/extensions to import
    defaultExtension: 'glsl',                   // Shader suffix when no extension is specified
    warnDuplicatedImports: true,                // Warn if the same chunk was imported multiple times
    compress: false                             // Compress the resulting shader code
})