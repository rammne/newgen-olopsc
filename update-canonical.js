const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'apps/web/src/pages');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Check if the page queries SEO data and has a Layout component
    if (content.includes('seo?.') || content.includes('seo {') || content.includes('get')) {
        // Find Layout tag
        if (content.includes('<Layout')) {
            // Check if canonicalUrl is already passed
            if (!content.includes('canonicalUrl={')) {
                // Determine the variable name holding the SEO data
                let seoVarMatch = content.match(/const\s+(\w+)\s*=\s*(?:await\s+)?get[A-Za-z0-9_]+\(/);
                
                // Try to find an existing definition of pageTitle, pageDescription to infer the object name
                let objectName = null;
                const descMatch = content.match(/([a-zA-Z0-9_]+)\?\.seo\?\.description/);
                if (descMatch) {
                    objectName = descMatch[1];
                } else if (seoVarMatch) {
                    objectName = seoVarMatch[1];
                }

                if (objectName) {
                    console.log(`Updating ${filePath} using object ${objectName}`);
                    
                    // Add const canonicalUrl = ... before <Layout
                    const layoutIndex = content.indexOf('<Layout');
                    
                    // Find the last variable declaration before Layout
                    let modifiedContent = content;
                    
                    const canonicalDecl = `const canonicalUrl = ${objectName}?.seo?.canonicalUrl;\n`;
                    
                    // Add the declaration right before the closing --- if it's not there
                    if (!modifiedContent.includes(`const canonicalUrl =`)) {
                        modifiedContent = modifiedContent.replace(/---\s*<Layout/, `${canonicalDecl}---\n\n<Layout`);
                    }
                    
                    // Update Layout props
                    modifiedContent = modifiedContent.replace(/<Layout([^>]*?)>/, (match, p1) => {
                        if (!p1.includes('canonicalUrl')) {
                            if (p1.trim().endsWith('/')) {
                                return `<Layout${p1.slice(0, -1)} canonicalUrl={canonicalUrl} />`;
                            }
                            return `<Layout${p1} canonicalUrl={canonicalUrl}>`;
                        }
                        return match;
                    });
                    
                    if (modifiedContent !== content) {
                        fs.writeFileSync(filePath, modifiedContent, 'utf-8');
                        console.log(`Updated ${filePath}`);
                    }
                } else {
                    // console.log(`Could not determine object name for ${filePath}`);
                }
            }
        }
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.astro')) {
            processFile(fullPath);
        }
    }
}

walkDir(pagesDir);
