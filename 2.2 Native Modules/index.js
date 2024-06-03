const fs = require('fs');

// fs.writeFile('messageNew.txt', 'This is maaz , we are trying node js', (err) => {
//     if (err) throw err;
//     console.log('The file has been saved!');
// }); 
fs.readFile('messageNew.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
}); 