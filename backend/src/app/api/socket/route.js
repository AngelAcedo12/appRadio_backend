export async function POST(req, res) {

    try {

        socket.emit('emit_transmision', 'Sync Process Completed');

        return NextResponse.json({ data: 'Success' }, { status: 200 });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: error }, { status: 200 })
    }

}