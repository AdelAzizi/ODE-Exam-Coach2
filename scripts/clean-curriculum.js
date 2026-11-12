const fs = require('fs');

let content = fs.readFileSync('lib/curriculum-data.ts', 'utf8');

// Replace all \$ with $
content = content.replace(/\\\$/g, '$');

// Replace corrupt $e^{At}$ patterns
content = content.replace(/\$\$e\^\{At\}\$B = B\$e\^\{At\}\$\$/g, '$e^{At}B = Be^{At}$');
content = content.replace(/\$\$e\^\{At\}\$B = B \$e\^\{At\}\$\$/g, '$e^{At}B = Be^{At}$');
content = content.replace(/\$e\^\{At\}\$B = B \$e\^\{At\}\$/g, '$e^{At}B = Be^{At}$');
content = content.replace(/\$e\^\{At\}\$B/g, '$e^{At}B$');
content = content.replace(/B \$e\^\{At\}\$/g, '$Be^{At}$');
content = content.replace(/B\$e\^\{At\}\$/g, '$Be^{At}$');
content = content.replace(/F'\(t\) = \$e\^\{At\}\$\(AB - BA\)\$e\^\{-At\}\$/g, "F'(t) = e^{At}(AB - BA)e^{-At}");

// In raw latex properties, remove any enclosing $
content = content.replace(/latex:\s*'\$([^$]+)\$'/g, (m, p1) => `latex: '${p1}'`);
content = content.replace(/answerLatex:\s*'\$([^$]+)\$'/g, (m, p1) => `answerLatex: '${p1}'`);
content = content.replace(/problemLatex:\s*'\$([^$]+)\$'/g, (m, p1) => `problemLatex: '${p1}'`);
content = content.replace(/statementLatex:\s*'\$([^$]+)\$'/g, (m, p1) => `statementLatex: '${p1}'`);

fs.writeFileSync('lib/curriculum-data.ts', content, 'utf8');
console.log('Cleaned curriculum-data.ts successfully');
