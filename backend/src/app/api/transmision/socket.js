const io = require('socket.io')

export default async function handler(req,res)  {

    if(res.socket.server) {
        res.end('Not found')
        return
    }else{
        console.log('Socket is initialized')
        const io = new Server(res.socket.server)
        res.socket.server.io = io
    }
    res.end()

}