sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'cursos/cursos/test/integration/FirstJourney',
		'cursos/cursos/test/integration/pages/CursosList',
		'cursos/cursos/test/integration/pages/CursosObjectPage',
		'cursos/cursos/test/integration/pages/EstudantesObjectPage'
    ],
    function(JourneyRunner, opaJourney, CursosList, CursosObjectPage, EstudantesObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('cursos/cursos') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheCursosList: CursosList,
					onTheCursosObjectPage: CursosObjectPage,
					onTheEstudantesObjectPage: EstudantesObjectPage
                }
            },
            opaJourney.run
        );
    }
);