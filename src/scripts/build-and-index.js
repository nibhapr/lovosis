import { google } from 'googleapis';
import { execSync } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const serviceAccountKey = require('../data/service-account-key.json');

const authClient = new google.auth.JWT({
  email: serviceAccountKey.client_email,
  key: serviceAccountKey.private_key,
  scopes: ['https://www.googleapis.com/auth/indexing'],
});


async function submitUrlToGoogleIndexing(url, type = 'URL_UPDATED') {
  await authClient.authorize();

  const indexing = google.indexing('v3');
  const response = await indexing.urlNotifications.publish({
    auth: authClient,
    requestBody: {
      url: url,
      type: type,
    },
  });

  return response.data;
}


function getChangedPages() {

  const changedFiles = execSync('git diff --name-only HEAD HEAD~1').toString().split('\n');
  const pages = changedFiles
    .filter((file) => file.startsWith('src/pages/') && file.endsWith('.astro'))
    .map((file) => file.replace('src/pages/', '').replace('.astro', ''));

  return pages;
}

async function main() {

  console.log('Building Astro project...');
  execSync('npm run build', { stdio: 'inherit' });

  const changedPages = getChangedPages();
  if (changedPages.length === 0) {
    console.log('No pages changed. Skipping Google Indexing.');
    return;
  }

  console.log('Changed pages:', changedPages);

  for (const page of changedPages) {
    const url = `https://lovosis.com/${page}`;
    console.log(`Submitting URL to Google Indexing: ${url}`);
    try {
      const result = await submitUrlToGoogleIndexing(url);
      console.log('Google Indexing response:', result);
    } catch (error) {
      console.error('Error submitting URL to Google Indexing:', error);
    }
  }
}

main();