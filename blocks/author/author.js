import { fetchPlaceholders, getMetadata } from '../../scripts/aem.js';

async function createTableWithPlaceholder(table){
    const locale=getMetadata("locale");
    const placeholders = await fetchPlaceholders(locale);
    const { fnameKey,lnameKey,firstName,lastName} = placeholders;

    let authorRow=document.createElement("tr");
    let authorCol=document.createElement("th");authorCol.appendChild(document.createTextNode(header));
    authorCol.colSpan=2;
    authorRow.append(authorCol);

    let firstNameRow=document.createElement("tr");
    let firstNameCol1=document.createElement("td");firstNameCol1.appendChild(document.createTextNode(fnameKey));
    let firstNameCol2=document.createElement("td");firstNameCol2.appendChild(document.createTextNode(firstName));
    firstNameRow.append(firstNameCol1);     firstNameRow.append(firstNameCol2);

    let lastNameRow=document.createElement("tr");
    let lastNameCol1=document.createElement("td");lastNameCol1.appendChild(document.createTextNode(lnameKey));
    let lastNameCol2=document.createElement("td");lastNameCol2.appendChild(document.createTextNode(lastName));
    lastNameRow.append(lastNameCol1);     lastNameRow.append(lastNameCol2);

    table.append(authorRow);
    table.append(firstNameRow);
    table.append(lastNameRow);
}

async function createTableWithDocument(table,block){
    const rows= [...block.children];
    console.log(" Rows ",rows.length);
    [...block.children].forEach((row,r) => {
      if(r==0){
         let row1=document.createElement("tr"); 
         [...row.children].forEach((col,c) => {
             let row1Col=document.createElement("th");
             row1Col.appendChild(document.createTextNode(col.textContent));
             row1Col.colSpan=2;
             row1.append(row1Col);
             //console.log(r,col.textContent);
            });
            table.append(row1);
      }else{
         let rowelse=document.createElement("tr"); 
          [...row.children].forEach((col,c) => {
           let rowelseCol=document.createElement("td");
           //console.log(r,col.textContent);
           rowelseCol.appendChild(document.createTextNode(col.textContent));
           rowelse.append(rowelseCol);
          });
          table.append(rowelse);
      }
    }); 
}

export default async function decorate(block) {
    const table = document.createElement('table');
    
   //console.log(header,firstName,lastName,role,organization,country);
   if([...block.children].length>1){
    createTableWithDocument(table,block)
   }else{
    createTableWithPlaceholder(table);
   }
   block.replaceWith(table);
  }