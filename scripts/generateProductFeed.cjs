const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { writeToPath } = require('fast-csv');
const glob = require('fast-glob');
const fsExtra = require('fs-extra');

const siteBaseUrl = 'https://lovosis.com'; // Update this
const contentFolders = [
  'src/content/hikvision',
  
];
const from = path.resolve('src/assets/camera');
const to = path.resolve('public/assets');
fsExtra.copySync(from, to);
console.log('✅ Copied product images to public/assets');
const outputPath = path.resolve('./public/products-feed.csv');

const generateProductFeed = async () => {
  const productFiles = await glob(contentFolders.map(folder => `${folder}/*.mdx`));
  const rows = [];

  for (const file of productFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const { data } = matter(content);

    if (!data.id || !data.slug || !data.title || !data.img) {
      console.warn(`⚠️ Missing required fields in: ${file}`);
      continue;
    }

   

    rows.push({
      id: data.id,
      title: data.title,
      description: data.desc || '',
      price: `${data.price?.toFixed(2) || '0.00'} ${data.currency || 'AED'}`,
      condition: 'new',
      link: `${siteBaseUrl}/${data.brand}/${data.slug}`,
      availability: 'in stock',
      image_link: `${siteBaseUrl}${data.imgurl}`,
      
      
     
    });
  }

  writeToPath(outputPath, rows, { headers: true })
    .on('finish', () => console.log(`✅ ${rows.length} products written to products-feed.csv`))
    .on('error', err => console.error('❌ CSV generation error:', err));
};

generateProductFeed();
