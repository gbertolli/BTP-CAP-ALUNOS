const cds = require('@sap/cds')

/**Service implementation */
module.exports = cds.service.impl(function(){

    this.before(['CREATE','UPDATE'], 'Estudantes', function(req) {

            console.log("Estudantes called");

            if(req.data && !req.data.Nome){
                //req.info(400, 'Info - Nome precisa ser preenchido');
                req.error(400, 'Erro - Nome precisa ser preenchido');
                //req.warn(400, 'Warning - Nome precisa ser preenchido');
                //req.notify(400, 'Notify - Nome precisa ser preenchido');
            }
    })

    this.before(['CREATE','UPDATE'], 'Cursos', function(req) {

        console.log("Cursos called");

        if(req.data && !req.data.Nome){
            //req.info(400, 'Info - Nome precisa ser preenchido');
            req.error(400, 'Erro - Nome precisa ser preenchido');
            //req.warn(400, 'Warning - Nome precisa ser preenchido');
            //req.notify(400, 'Notify - Nome precisa ser preenchido');
        }

        if(req.data && !req.data.MaxEstudantes > 30){
            req.error(400, 'Erro - Limite de 30 alunos excedido');
        }
    })

    this.on('notificaAluno', async function(req) {
        console.log("Notifica Aluno");
        let id;
        let alunos;
        let query;
        let Nome;
        let status;
        let curso_ID;
        let cursos;
        let curso_nome;

        //recupera ID do Aluno através do params
        const params = req.params;
        if(params != null){

            let adms = await cds.connect.to('AdminService'); //>connected via OData

            for (let i = 0; i < params.length; i++){
                if (params[i].ID != null){

                    id = params[i].ID;
                    console.log(`ID: ` + id);

                    query = SELECT `ID,Nome,DtAniversario,curso,status` .from `Estudantes` .where `ID = ${id}`;
                    alunos = await adms.run (query);
                    if (alunos){
                        Nome = alunos[0].Nome;
                        curso_ID = alunos[0].curso_ID;
                        status = alunos[0].status;
                    }

                console.log(`Nome: ` + Nome + ` - ID Curso: ` + curso_ID);

                    query = SELECT `ID,Nome` .from `Cursos` .where `ID = ${curso_ID}`;
                    cursos = await adms.run (query);
                    if (cursos){
                        curso_nome = cursos[0].Nome;
                    }

                    console.log('Nome Curso: ' + curso_nome);

                    req.info(200,'Aluno: ' + id + ' ' + Nome + ' cursando: ' + curso_nome + 'Status: ' + status + 'Notificado com sucesso!');

                }
            }
        }
    })

    this.after('READ', 'Estudantes', function(data) {

        //Entidade Estudantes
        const alunos = Array.isArray(data) ? data : [data];

                //Lê todos os registros para determinar a criticidade baseada no status do Aluno
                alunos.forEach((aluno) => {

                    //atualiza criticidade
                    switch (aluno.status){
                        case 'A': //Ativo
                                aluno.critico = 3;
                                break;
                        case 'I': //Inativo
                                aluno.critico = 2;
                                break;
                        case 'P': //Pendente
                                aluno.critico = 1;
                                break;
                        default:
                                break;
                    }
                })
    })



this.on('inativaAluno',async function(req){

    console.log("Inativa Aluno");

    const {Estudantes} = this.entities; //Entidade

    //recupera ID do Aluno através do params
    const params = req.params;
    if(params != null){

        for(let i = 0; i < params.length; i++){
            if(params[i].ID != null){

                await UPDATE.entity(Estudantes,params[i].ID)
                            .set({status:'I', observacao: req.data.text});

                console.log('ID: ' + params[i].ID + ' - Status: ' + params[i].status);

                req.info(400,'Aluno: ' + params[i].ID + ' ' + req.data.text + 'Status atualizado com sucesso!');

            }
        }
    }

    req.reply();
})
})