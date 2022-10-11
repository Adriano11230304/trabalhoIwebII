const db = require('../persistencia/configDB');

class Post{
    id;
    title;
    description;
    author;
    created_at;

    constructor(title, description, author, created_at, id) {
        this.title = title;
        this.description = description;
        this.author = author;
        this.created_at = created_at ? created_at : new Date();
        this.id = id ? id : 0;
    }

    static listAll(offset) {
        let sql = 'select * from posts order by created_at desc LIMIT 5 OFFSET ?;';
        const listagem = [];
        let id, description, title, author, created_at;

        return new Promise((resolve, reject) => {
            db.all(sql, [offset], (err, rows) => {
                if (err) {
                    console.log(err.message);
                } else {
                    for (let i = 0; i < rows.length; i++) {
                        id = rows[i].id;
                        description = rows[i].description;
                        title = rows[i].title;
                        author = rows[i].author;
                        created_at = new Date(rows[i].created_at);
                        let post = new Post(title, description, author, created_at, id);
                        listagem.push(post);
                    }
                };

                resolve(listagem);
            })
            
        })
    }

    static list() {
        
        let sql = 'select * from posts order by created_at desc;';
        const listagem = [];
        let id, description, title, author, created_at;

        return new Promise((resolve, reject) => {
            db.all(sql, (err, rows) => {
                if (err) {
                    console.log(err.message);
                } else {
                    for (let i = 0; i < rows.length; i++) {
                        id = rows[i].id;
                        description = rows[i].description;
                        title = rows[i].title;
                        author = rows[i].author;
                        created_at = new Date(rows[i].created_at);
                        let post = new Post(title, description, author, created_at, id);
                        listagem.push(post);
                    }
                };

                resolve(listagem);
            })

        })
    }

    static getById(id){
        let sql = 'select * from posts where id = ?;';
        let id1, title, description, created_at, author, post;
        return new Promise((resolve, reject) => {
            db.all(sql, [id], (err, rows)=> {
                if(err){
                    console.log('Erro', err);
                }else{
                    
                    id1 = rows[0].id;
                    title = rows[0].title;
                    description = rows[0].description;
                    created_at = new Date(rows[0].created_at);
                    author = rows[0].author;
                    post = new Post(title, description, author, created_at, id1)
                    
                }

                resolve(post);
                
            })
        })
    }

    getDateFormatter(){
        const dia = this.created_at.getDate() < 10 ? '0' + this.created_at.getDate() : this.created_at.getDate();
        const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        const mes = months[this.created_at.getMonth()];
        const ano = this.created_at.getFullYear();
        const hora = this.created_at.getHours() < 10 ? '0' + this.created_at.getHours() : this.created_at.getHours();
        const minutos = this.created_at.getMinutes() < 10 ? '0' + this.created_at.getMinutes() : this.created_at.getMinutes();
        const segundos = this.created_at.getSeconds() < 10 ? '0' + this.created_at.getSeconds() : this.created_at.getSeconds();
        const date = dia + ' de ' + mes + ' de ' + ano + ' ' + hora + ':' + minutos + ':' + segundos;
        return date;
    }

    save(callback){
        let sql = 'insert into posts(title, description, author, created_at) values(?, ?, ?, ?);';
        db.run(sql, [this.title, this.description, this.author, this.created_at], (err) => {
            if (err) {
                console.log("Erro", err);
            }

            callback();
        });
    }

    static delete(id, callback){
        let sql = 'delete from posts where id = ?;';
        db.run(sql, [id], (err)=> {
            if(err){
                console.log("Erro", err);
            }

            callback();
        });
    }

    update(callback){
        let sql = 'UPDATE posts SET title = ?, description = ? WHERE id = ?;';
        db.run(sql, [this.title, this.description, this.id], (err) => {
            if (err) {
                console.log("Erro", err);
            }

            callback();
        })

    }

    static search(search){
        let sql = "select * from posts where title like ?;";
        let id, title, description, created_at, author, post;
        let searchall = '%' + search + '%';
        const listagem = [];
        return new Promise((resolve, reject) => {
            db.all(sql, [searchall], (err, rows) => {
                if(rows){
                    // console.log(rows);
                    for (let i = 0; i < rows.length; i++) {
                        id = rows[i].id;
                        description = rows[i].description;
                        title = rows[i].title;
                        author = rows[i].author;
                        created_at = new Date(rows[i].created_at);
                        let post = new Post(title, description, author, created_at, id);
                        listagem.push(post);
                    }
                }

                resolve(listagem);

            })
        })
    }

}

module.exports = Post;