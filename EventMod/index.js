const EvenEmitter  = require('events');
const event = new EvenEmitter();

// event.on('symyname',()=>{
//     console.log('hy')
// })

// event.on('symyname',()=>{
//     console.log('hello')
// })


// event.on('symyname',()=>{
//     console.log('how are u')
// })

// event.emit('symyname');
event.on('chekmyevent',(sc,msg)=>{
    console.log(`stuts code is a ${sc} and mssage is a ${msg}`);
})

event.emit('chekmyevent',200,'ok');