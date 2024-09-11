using { treinamento, sap.common } from '../db/schemas';

service AdminService {

    type inText : {
        comment: String;
    }    

    entity Estudantes as projection on treinamento.Alunos actions {
        @Common.IsActionCritical
        action notificaAluno(); 
        @Common.IsActionCritical
        action inativaAluno(text:inText:comment);
    };
    annotate Estudantes with @odata.draft.enabled;
    annotate Estudantes @odata.draft.bypass;

    entity Cursos as projection on treinamento.Cursos;
    annotate Cursos with @odata.draft.enabled;
    annotate Cursos @odata.draft.bypass;
}

service EstudantesService {

    view EstudantesByCursos as
        select from treinamento.Cursos as CursosEstudantes {
            key ID,
            Nome,
            estudantes.Nome as NomeEstudante,
            estudantes.DtAniversario as DataAniversario,
            estudantes.email as Email
        }

}

annotate AdminService.inText:comment with @Common.Label : 'Deseja realizar a inativação? Incluir observações:';
annotate AdminService.inText:comment with @UI.MultiLineText : true;