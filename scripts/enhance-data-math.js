const fs = require('fs');

let content = fs.readFileSync('lib/curriculum-data.ts', 'utf8');

// Function to safely wrap math inside text strings
// Replace lines that contain specific unwrapped math
const patterns = [
  // Matrices
  [/\\det \\begin\{pmatrix\}[\s\S]*?\\end\{pmatrix\} = ad - bc/g, '$\\det \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc$'],
  [/r = \\frac\{-b \\pm \\sqrt\{b\^2 - 4ac\}\}\{2a\}/g, '$r = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$'],
  [/e\^\{i\\theta\} = \\cos \\theta \+ i \\sin \\theta/g, '$e^{i\\theta} = \\cos \\theta + i \\sin \\theta$'],
  [/\\dot\{X\} = AX/g, '$\\dot{X} = AX$'],
  [/X\(t\) = e\^\{rt\}v/g, '$X(t) = e^{rt}v$'],
  [/\\alpha \\pm i\\beta/g, '$\\alpha \\pm i\\beta$'],
  [/v\^\{\(1\)\} \\pm i v\^\{\(2\)\}/g, '$v^{(1)} \\pm i v^{(2)}$'],
  [/r = 1 \+ 2i/g, '$r = 1 + 2i$'],
  [/v = \\begin\{pmatrix\} 1 \\\\ i \\end\{pmatrix\}/g, '$v = \\begin{pmatrix} 1 \\\\ i \\end{pmatrix}$'],
  [/X\^\{\(2\)\}\(t\) = \\text\{Im\}\(e\^\{rt\}v\)/g, '$X^{(2)}(t) = \\text{Im}(e^{rt}v)$'],
  [/e\^\{\(1\+2i\)t\} = e\^t\(\\cos 2t \+ i\\sin 2t\)/g, '$e^{(1+2i)t} = e^t(\\cos 2t + i\\sin 2t)$'],
  [/i\\cos 2t - \\sin 2t/g, '$i\\cos 2t - \\sin 2t$'],
  [/\\cos 2t/g, '$\\cos 2t$'],
  [/n \\times n/g, '$n \\times n$'],
  [/X\^\{\(1\)\}\(t\) = e\^\{\\alpha t\} \(\\cos \\beta t \\, v\^\{\(1\)\} - \\sin \\beta t \\, v\^\{\(2\)\}\)/g, '$X^{(1)}(t) = e^{\\alpha t} (\\cos \\beta t \\, v^{(1)} - \\sin \\beta t \\, v^{(2)})$'],
  [/X\^\{\(2\)\}\(t\) = e\^\{\\alpha t\} \(\\cos \\beta t \\, v\^\{\(2\)\} \+ \\sin \\beta t \\, v\^\{\(1\)\}\)/g, '$X^{(2)}(t) = e^{\\alpha t} (\\cos \\beta t \\, v^{(2)} + \\sin \\beta t \\, v^{(1)})$'],
  [/\(r-1\)\^2 = -4 \\implies r = 1 \\pm 2i/g, '$(r-1)^2 = -4 \\implies r = 1 \\pm 2i$'],
  [/\(A - \(1\+2i\)I\)v = 0/g, '$(A - (1+2i)I)v = 0$'],
  [/v_1 = 1/g, '$v_1 = 1$'],
  [/v = \\begin\{pmatrix\} 1 \\\\ i \\end\{pmatrix\} = \\begin\{pmatrix\} 1 \\\\ 0 \\end\{pmatrix\} \+ i \\begin\{pmatrix\} 0 \\\\ 1 \\end\{pmatrix\}/g, '$v = \\begin{pmatrix} 1 \\\\ i \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix} + i \\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix}$'],
  [/c_1 e\^\{\(1\+2i\)t\}v/g, '$c_1 e^{(1+2i)t}v$'],
  [/i \\times i = -1/g, '$i \\times i = -1$'],
  [/i\(\\cos 2t \+ i\\sin 2t\)/g, '$i(\\cos 2t + i\\sin 2t)$'],
  [/-\\sin 2t \+ i\\cos 2t/g, '$-\\sin 2t + i\\cos 2t$'],
  [/\\det\(A-rI\) = r\^2 \+ 9 = 0 \\implies r = \\pm 3i \(یعنی \\alpha = 0, \\beta = 3\)/g, '$\\det(A-rI) = r^2 + 9 = 0 \\implies r = \\pm 3i$ (یعنی $\\alpha = 0, \\beta = 3$)'],
  [/\\begin\{pmatrix\} -3i & 3 \\\\ -3 & -3i \\end\{pmatrix\} \\begin\{pmatrix\} v_1 \\\\ v_2 \\end\{pmatrix\} = 0 \\implies v_2 = i v_1 \\implies v = \\begin\{pmatrix\} 1 \\\\ i \\end\{pmatrix\}/g, '$\\begin{pmatrix} -3i & 3 \\\\ -3 & -3i \\end{pmatrix} \\begin{pmatrix} v_1 \\\\ v_2 \\end{pmatrix} = 0 \\implies v_2 = i v_1 \\implies v = \\begin{pmatrix} 1 \\\\ i \\end{pmatrix}$'],
  [/X\^\{\(1\)\}\(t\) = \\begin\{pmatrix\} \\cos 3t \\\\ -\\sin 3t \\end\{pmatrix\}, \\quad X\^\{\(2\)\}\(t\) = \\begin\{pmatrix\} \\sin 3t \\\\ \\cos 3t \\end\{pmatrix\}/g, '$X^{(1)}(t) = \\begin{pmatrix} \\cos 3t \\\\ -\\sin 3t \\end{pmatrix}, \\quad X^{(2)}(t) = \\begin{pmatrix} \\sin 3t \\\\ \\cos 3t \\end{pmatrix}$'],
  [/X\(0\) = c_1 \\begin\{pmatrix\} 1 \\\\ 0 \\end\{pmatrix\} \+ c_2 \\begin\{pmatrix\} 0 \\\\ 1 \\end\{pmatrix\} = \\begin\{pmatrix\} 2 \\\\ 1 \\end\{pmatrix\} \\implies c_1 = 2, c_2 = 1/g, '$X(0) = c_1 \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix} + c_2 \\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix} \\implies c_1 = 2, c_2 = 1$'],

  // Module 2 & 3
  [/\(A-rI\)v = 0/g, '$(A-rI)v = 0$'],
  [/\(A-rI\)\^2 v = 0/g, '$(A-rI)^2 v = 0$'],
  [/e\^\{At\} = \\psi\(t\)\\psi\^\{-1\}\(0\)/g, '$e^{At} = \\psi(t)\\psi^{-1}(0)$'],
  [/AB = BA \\implies e\^\{At\}B = Be\^\{At\}/g, '$AB = BA \\implies e^{At}B = Be^{At}$'],
  [/AB = BA/g, '$AB = BA$'],
  [/e\^\{At\}B = Be\^\{At\}/g, '$e^{At}B = Be^{At}$'],
  [/e\^\{At\}B = B e\^\{At\}/g, '$e^{At}B = B e^{At}$'],
  [/\\psi\^\{-1\}\(0\)/g, '$\\psi^{-1}(0)$'],
  [/\\psi\(t\)/g, '$\\psi(t)$'],
  [/\\psi\(0\)/g, '$\\psi(0)$'],
  [/e\^\{At\}/g, '$e^{At}$'],
  [/e\^\{-At\}/g, '$e^{-At}$'],
  [/F\(t\) = e\^\{At\} B e\^\{-At\}/g, '$F(t) = e^{At} B e^{-At}$'],
  [/F\'\(t\) = 0/g, '$F\'(t) = 0$'],
  [/\\dot\{X\} = AX \+ g\(t\)/g, '$\\dot{X} = AX + g(t)$'],

  // Module 4 & 5
  [/y\' = \\sqrt\{\|y\|\}/g, '$y\' = \\sqrt{|y|}$'],
  [/y\(0\) = 0/g, '$y(0) = 0$'],
  [/y_0, y_1, y_2, \\dots/g, '$y_0, y_1, y_2, \\dots$'],
  [/\\partial f \/ \\partial y/g, '$\\partial f / \\partial y$'],
  [/\\frac\{\\partial f\}\{\\partial y\}/g, '$\\frac{\\partial f}{\\partial y}$'],
  [/\\lim_\{y \\to 0\}/g, '$\\lim_{y \\to 0}$'],
  [/\|f\(x, y_1\) - f\(x, y_2\)\| \\le L \|y_1 - y_2\|/g, '$|f(x, y_1) - f(x, y_2)| \\le L |y_1 - y_2|$'],
  [/\|y\(x\) - \\tilde\{y\}\(x\)\| \\le M\|x_1 - x_0\| e\^\{L\|x - x_1\|\}/g, '$|y(x) - \\tilde{y}(x)| \\le M|x_1 - x_0| e^{L|x - x_1|}$'],
  [/\|\\phi\(x\) - \\psi\(x\)\| \\le \|y_0 - \\hat\{y\}_0\|e\^\{L\|x-x_0\|\}/g, '$|\\phi(x) - \\psi(x)| \\le |y_0 - \\hat{y}_0|e^{L|x-x_0|}$'],
  [/u\(t\)e\^\{-Lt\}/g, '$u(t)e^{-Lt}$'],
  [/x_0/g, '$x_0$'],
  [/x_1/g, '$x_1$'],

  // Module 6 & 7
  [/\\dot\{a\}_0 = a_1/g, '$\\dot{a}_0 = a_1$'],
  [/\\dot\{a\}_0\(t\) = a_1\(t\)/g, '$\\dot{a}_0(t) = a_1(t)$'],
  [/\\mu\(t\)/g, '$\\mu(t)$'],
  [/x\'\' \+ \(t\+1\)x = 0/g, '$x\'\' + (t+1)x = 0$'],
  [/\\ddot\{x\} < 0/g, '$\\ddot{x} < 0$'],
  [/\\ddot\{x\} = -\(t\+1\)x/g, '$\\ddot{x} = -(t+1)x$'],
  [/\\dot\{x\}\(t\)/g, '$\\dot{x}(t)$'],
  [/R\(x\) = y_2\/y_1/g, '$R(x) = y_2/y_1$'],
  [/R\(x\) = \\frac\{y_2\(x\)\}\{y_1\(x\)\}/g, '$R(x) = \\frac{y_2(x)}{y_1(x)}$'],
  [/W\(y_1, y_2\)/g, '$W(y_1, y_2)$'],
  [/\\mathbb\{R\}/g, '$\\mathbb{R}$'],
  [/\\pm 2i/g, '$\\pm 2i$'],
  [/\\pm 3i/g, '$\\pm 3i$'],
  [/\\pm 4i/g, '$\\pm 4i$'],
];

// Clean duplicate $$ if any created
for (const [re, repl] of patterns) {
  content = content.replace(re, repl);
}

// Clean any double $$ ... $$ where inline was intended
content = content.replace(/\$\$(y' = \\sqrt\{\|y\|\})\$\$/g, '$$$1$$');

fs.writeFileSync('lib/curriculum-data.ts', content, 'utf8');
console.log('Finished updating curriculum-data.ts');
