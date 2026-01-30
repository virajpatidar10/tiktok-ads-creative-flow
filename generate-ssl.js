const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔐 Generating SSL certificates for HTTPS development...');

try {
  // Check if certificates already exist
  if (fs.existsSync('localhost.pem') && fs.existsSync('localhost-key.pem')) {
    console.log('✅ SSL certificates already exist!');
    process.exit(0);
  }

  // Try to use mkcert if available
  try {
    execSync('mkcert -version', { stdio: 'ignore' });
    console.log('📋 Using mkcert to generate certificates...');
    execSync('mkcert localhost 127.0.0.1 ::1', { stdio: 'inherit' });
    console.log('✅ SSL certificates generated successfully with mkcert!');
  } catch (error) {
    console.log('⚠️  mkcert not found. Installing via npm...');
    
    // Install mkcert locally
    execSync('npm install -g mkcert', { stdio: 'inherit' });
    
    // Create CA
    execSync('mkcert -install', { stdio: 'inherit' });
    
    // Generate certificates
    execSync('mkcert localhost 127.0.0.1 ::1', { stdio: 'inherit' });
    console.log('✅ SSL certificates generated successfully!');
  }

  console.log('\n🚀 You can now run the development server with HTTPS:');
  console.log('   npm run dev');
  console.log('\n🌐 Your app will be available at:');
  console.log('   https://localhost:3000');
  console.log('\n📝 Make sure to configure your TikTok Developer App with:');
  console.log('   Redirect URI: https://localhost:3000/auth/callback');

} catch (error) {
  console.error('❌ Error generating SSL certificates:', error.message);
  console.log('\n🔧 Manual setup required:');
  console.log('1. Install mkcert: https://github.com/FiloSottile/mkcert');
  console.log('2. Run: mkcert -install');
  console.log('3. Run: mkcert localhost 127.0.0.1 ::1');
  console.log('4. Restart the development server');
  process.exit(1);
}