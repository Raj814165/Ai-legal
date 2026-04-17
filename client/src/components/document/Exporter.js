import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export async function exportElementAsPDF(el, filename='document.pdf'){
  // Clone the element and render the clone off-screen so we can force black text
  // (prevents exporting white text when dark theme is active)
  const clone = el.cloneNode(true);
  // copy current form values (textarea/input) from source into clone
  const srcInputs = el.querySelectorAll('input, textarea');
  const clonedInputs = clone.querySelectorAll('input, textarea');
  clonedInputs.forEach((c, i) => {
    const s = srcInputs[i];
    if (s) {
      try { c.value = s.value; c.setAttribute('value', s.value); } catch(e) {}
    }
  });

  // Apply inline styles to force black text and white background for all nodes
  clone.style.setProperty('color', '#000', 'important');
  clone.style.setProperty('background-color', '#fff', 'important');
  const nodes = clone.querySelectorAll('*');
  nodes.forEach((node) => {
    try {
      node.style.setProperty('color', '#000', 'important');
      node.style.setProperty('background-color', '#fff', 'important');
      // SVG/text fills and strokes
      node.style.setProperty('fill', '#000', 'important');
      node.style.setProperty('stroke', '#000', 'important');
      // Ensure inputs/textareas show black text
      if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
        node.style.setProperty('color', '#000', 'important');
        node.style.setProperty('background-color', '#fff', 'important');
        node.style.setProperty('-webkit-text-fill-color', '#000', 'important');
      }
    } catch (e) {
      // ignore nodes that can't be styled
    }
  });

  // Render the clone off-screen
  const wrapper = document.createElement('div');
  wrapper.style.position = 'fixed';
  wrapper.style.left = '-9999px';
  wrapper.style.top = '0';
  wrapper.style.zIndex = '-9999';
  wrapper.style.backgroundColor = '#fff';
  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  const canvas = await html2canvas(clone, { scale: 2, backgroundColor: '#fff' });
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p','pt','a4');
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(filename);

  // cleanup
  document.body.removeChild(wrapper);
}
