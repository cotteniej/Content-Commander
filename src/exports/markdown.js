function format(idea, outline) {
    let md = `# ${idea.title}\n\n`;
    
    // Add metadata
    md += `- **Type:** ${idea.type}\n`;
    md += `- **Created:** ${new Date(idea.createdAt).toLocaleString()}\n`;
    
    if (idea.tags && idea.tags.length > 0) {
      md += `- **Tags:** ${idea.tags.join(', ')}\n`;
    }
    
    if (idea.status) {
      md += `- **Status:** ${idea.status}\n`;
    }
    
    if (idea.dueDate) {
      md += `- **Due Date:** ${new Date(idea.dueDate).toLocaleDateString()}\n`;
    }
    
    // Add description
    md += `\n## Description\n\n${idea.description}\n\n`;
    
    // Add outline
    if (outline && outline.sections && outline.sections.length > 0) {
      md += `## Outline\n\n`;
      
      outline.sections.forEach((section, index) => {
        md += `### ${index + 1}. ${section.name}\n\n${section.content}\n\n`;
      });
    }
    
    return md;
  }
  
  module.exports = {
    format,
    extension: 'md'
  };