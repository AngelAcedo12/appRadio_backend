async function GET (request) {
   
    return  new Response(JSON.stringify({message: 'Hello World!'}));
}
async function POST (request) { 
    console.log(await request.json())
    return  new Response(JSON.stringify({message: 'Hello World!'}));    
}   
export  { GET,POST }