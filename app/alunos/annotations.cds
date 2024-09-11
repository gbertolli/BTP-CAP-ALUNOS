using AdminService as service from '../../srv/service';
annotate service.Estudantes with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Nome',
                Value : Nome,
            },
            {
                $Type : 'UI.DataField',
                Label : 'DtAniversario',
                Value : DtAniversario,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Curso',
                Value : Curso_ID,
            },
            {
                $Type : 'UI.DataField',
                Value : Telefone,
                Label : 'Telefone',
            },
            {
                $Type : 'UI.DataField',
                Value : email,
                Label : 'email',
            },
            {
                $Type : 'UI.DataField',
                Value : status,
                Label : 'status',
            },
            {
                $Type : 'UI.DataField',
                Value : critico,
                Label : 'critico',
                Criticality : critico,
            },
            {
                $Type : 'UI.DataField',
                Value : observacao,
                Label : 'observação',
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Nome',
            Value : Nome,
        },
        {
            $Type : 'UI.DataField',
            Label : 'DtAniversario',
            Value : DtAniversario,
        },
        {
            $Type : 'UI.DataField',
            Label : 'IDCurso',
            Value : Curso_ID,
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action : 'AdminService.notificaAluno',
            Label : 'notificaAluno',
        },
    ],
    UI.Identification : [
        {
            $Type : 'UI.DataFieldForAction',
            Action : 'AdminService.inativaAluno',
            Label : 'Inativar Aluno',
            ![@UI.Hidden] : {$edmJson: {$If: [
                {$Eq: [
                    {$Path: 'IsActiveEntity'},
                    false // IsActiveEntity = false se estiver em edit mode
                ]},
                true, //Se não estiver em edit mode, exibe o botão
                false
            ]}}
        },
    ],
);

annotate service.Estudantes with {
    Curso @(
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Cursos',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : Curso_ID,
                    ValueListProperty : 'ID',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'Nome',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'MaxEstudantes',
                },
            ],
        },
        Common.Text : {
            $value : Curso.Nome,
            ![@UI.TextArrangement] : #TextOnly
        },
        Common.ValueListWithFixedValues : true,
    )
};

annotate service.Cursos with {
    ID @Common.Text : {
        $value : Nome,
        ![@UI.TextArrangement] : #TextOnly,
    }
};

annotate service.Estudantes with {
    observacao @(
        UI.MultiLineText : true,
        Common.FieldControl : #ReadOnly,
    )
};

