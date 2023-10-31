function generateInvoiceHtml(invoiceData) {
  const html = `
    <html>
      <head>
        <style>
          /* Add your CSS styles here */
        </style>
      </head>
      <body>
        <h1>Invoice</h1>
        <p>Invoice Number: ${invoiceData.invoiceNumber}</p>
        <p>Invoice Date: ${invoiceData.invoiceDate}</p>
        <h2>Customer Information</h2>
        <p>Name: ${invoiceData.customer.name}</p>
        <p>Address: ${invoiceData.customer.address}</p>
        <h2>Invoice Items</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            ${invoiceData.items.map(item => `
              <tr>
                <td>${item.title}</td>
                <td>${item.quantity}</td>
                <td>${item.price}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <p>Total Amount: $${invoiceData.totalAmount}</p>
      </body>
    </html>
  `;

  return html;

}

module.exports = {generateInvoiceHtml}