$(function(){

    var model = {
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function(obj) { 
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        deleteAll: function(){
            if (localStorage.notes) {
                localStorage.removeItem('notes');
            }
        },
        getAllNotes: function() {
            if (localStorage.notes) {
              return JSON.parse(localStorage.notes); 
            }
           
        }
    };


    var octopus = {
        addNewNote: function(noteStr) {
            model.init();
            model.add({
                content: noteStr,
                dateNote: new Date().toString(),
            });
          view.render();
        },
        deleteAllNotes: function(){
           model.deleteAll();
           view.render();
        },
        getNotes: function() {
           return model.getAllNotes().reverse();
          
        },

        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() {
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            var button = $('#delete-notes');
            button.click(function(e){ 
                
                octopus.deleteAllNotes();
                
            });
            newNoteForm.submit(function(e){
                octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                e.preventDefault();
            });
            view.render();
        },
        render: function(){

            var htmlStr = '';
           
        // if (localStorage.length > 0 ){
         if (localStorage.getItem('notes') !== null) {  
            octopus.getNotes().forEach(function(note){
                // htmlStr += '<li class="note">'+
                //         note.content + 
                //     '</li>';
             htmlStr += `<li class="note">
                      <span class='note-date'>${note.dateNote} </span>
                     ${note.content}
                      </li>`;
            });
            this.noteList.html( htmlStr );
        } else {
            htmlStr = '<li>No notes</li>';
            this.noteList.html( htmlStr );
        }
      }
    };

    octopus.init();
});