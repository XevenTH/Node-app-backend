const { nanoid } = require("nanoid");
const { notes } = require('./notes')

const addNotesHandler = (request, h) => {
    const { title, tags, body } = request.payload;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNotes = {
        title, body, tags, id, createdAt, updatedAt
    }

    notes.push(newNotes);
    const isSucces = notes.filter(note => note.id === id).length > 0;

    if(isSucces)
    {
        const response = h.response({
            status: 'succes',
            message: 'Catatan Berhasil Ditambahkan',
            data: {
                noteId: id,
            }
        });

        response.code(201);
        return response;
    };

    const response = h.response({
        status: 'fail',
        message: 'Catatan Gagal Ditambahkan'
    });
    response.code(500);
    return response;
};

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
      notes,
    },
  });

const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const note = notes.filter(n => n.id === id)[0];

    if(note !== undefined)
    {
        return {
            status: 'succes',
            data: {
                note,
            }
        };
    };

    const response = h.response({
        status: 'fail',
        message: 'Gagal Menampilkan Data'
    });
    response.code(404);
    return response;
};

const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const { body, tags, title } = request.payload;

    const updatedAt = new Date().toISOString();

    const index = notes.findIndex(note => note.id === id);

    if(index !== -1)
    {
        notes[index] = {
            ...notes[index],
            body,
            title,
            tags,
            updatedAt
        };

        const response = h.response({
            status: 'succes',
            message: 'Catatan Berhasil Diubah',
        });

        response.code(201);
        return response;
    };

    const response = h.response({
        status: 'fail',
        message: 'Catatan Gagal Diubah'
    });
    response.code(500);
    return response;
};

const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const index = notes.findIndex(note => note.id === id);

    if(index !== -1)
    {
        notes.splice(index, 1);
        const response = h.response({
            status: 'succes',
            message: 'Catatan Berhasil Dihapus',
        });

        response.code(201);
        return response;
    };

    const response = h.response({
        status: 'fail',
        message: 'Catatan Gagal Dihapus'
    });
    response.code(500);
    return response;
};

module.exports = { 
    addNotesHandler, 
    getAllNotesHandler, 
    getNoteByIdHandler, 
    editNoteByIdHandler,
    deleteNoteByIdHandler
};