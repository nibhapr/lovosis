import fs from 'node:fs/promises'
import { globby } from 'globby'
// import { minify } from 'html-minifier-terser'

// Get all HTML files from the output directory
const path = './.vercel/output/static'
const files = await globby(`${path}/**/*.html`)
