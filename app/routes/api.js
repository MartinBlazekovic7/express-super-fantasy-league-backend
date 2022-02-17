

module.exports=function(express,pool){

    const apiRouter = express.Router();

    apiRouter.get('/', function(req, res) {
        res.json({ message: 'Dobro dosli na nas API!' });
    });

    apiRouter.route('/users').get(async function(req,res){

        try {

            let conn = await pool.getConnection();
            let rows = await conn.query('SELECT * FROM users');
            conn.release();
            res.json(rows);

        } catch (e){
            console.log(e);
            return res.json({"code" : 100, "status" : "Error with query"});

        }


    }).post(async function(req,res){

        const user = {
            username : req.body.username,
            password : req.body.password,
            email : req.body.email,
            name : req.body.name,
            role : 1
        };

        try {

            let conn = await pool.getConnection();
            let q = await conn.query('INSERT INTO users SET ?', user);
            conn.release();
            res.json({ status: 'OK', insertId:q.insertId });

        } catch (e){
            console.log(e);
            res.json({ status: 'NOT OK' });
        }



    }).put(async function(req,res){

        const user = {
            username : req.body.username,
            password : req.body.password,
            email : req.body.email

        };

        console.log(req.body);

        try {

            let conn = await pool.getConnection();
            let q = await conn.query('UPDATE users SET ? WHERE id = ?', [user,req.body.id]);
            conn.release();
            res.json({ status: 'OK', changedRows:q.changedRows });
            console.log(q);

        } catch (e){
            res.json({ status: 'NOT OK' });
        }

    }).delete(async function(req,res){

        res.json({"code" : 101, "status" : "Body in delete request"});




    });

    apiRouter.route('/users/:id').get(async function(req,res){

        try {

            let conn = await pool.getConnection();
            let rows = await conn.query('SELECT * FROM users WHERE idUser=?',req.params.id);
            conn.release();
            res.json({ status: 'OK', user:rows[0]});

        } catch (e){
            console.log(e);
            return res.json({"code" : 100, "status" : "Error with query"});

        }



    }).delete(async function(req,res){

        try {

            let conn = await pool.getConnection();
            let q = await conn.query('DELETE FROM users WHERE id = ?', req.params.id);
            conn.release();
            res.json({ status: 'OK', affectedRows :q.affectedRows });

        } catch (e){
            res.json({ status: 'NOT OK' });
        }

    });

    apiRouter.route('/players').get(async function(req,res){

        try {

            let conn = await pool.getConnection();
            let rows = await conn.query('select * from players');
            conn.release();
            res.json(rows);

        } catch (e){
            console.log(e);
            return res.json({"code" : 100, "status" : "Error with query"});

        }


    }).post(async function(req,res){

        const player = {
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            clubId : req.body.clubId,
            goals : req.body.goals,
            assists :  req.body.assists,
            avg_rating :  req.body.avg_rating,
            playerPrice : req.body.playerPrice,
            position : req.body.position,
            totalPoints : req.body.totalPoints,
            cleanSheets : req.body.cleanSheets
        };

        try {

            let conn = await pool.getConnection();
            let q = await conn.query('INSERT INTO players SET ?', player);
            conn.release();
            res.json({ status: 'OK', insertId:q.insertId });

        } catch (e){
            console.log(e);
            res.json({ status: 'NOT OK' });
        }



    }).put(async function(req,res){

        const player = {
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            clubId : req.body.clubId,
            goals : req.body.goals,
            assists :  req.body.assists,
            avg_rating :  req.body.avg_rating,
            playerPrice : req.body.playerPrice,
            position : req.body.position,
            totalPoints : req.body.totalPoints,
            cleanSheets : req.body.cleanSheets
        };

        console.log(req.body);

        try {
            let conn = await pool.getConnection();
            let q = await conn.query('UPDATE players SET ? WHERE idPlayer = ?', [player,req.body.idPlayer]);
            conn.release();
            res.json({ status: 'OK', changedRows:q.changedRows });
            console.log(q);

        } catch (e){
            res.json({ status: 'NOT OK' });
        }

    }).delete(async function(req,res){
        res.json({"code" : 101, "status" : "Body in delete request"});
    });

    apiRouter.route('/players/:id').get(async function(req,res){

        try {

            let conn = await pool.getConnection();
            let rows = await conn.query('SELECT * FROM players WHERE idPlayer =?',req.params.id);
            conn.release();
            res.json({ status: 'OK', user:rows[0]});

        } catch (e){
            console.log(e);
            return res.json({"code" : 100, "status" : "Error with query"});

        }



    }).delete(async function(req,res){

        try {

            let conn = await pool.getConnection();
            let q = await conn.query('DELETE FROM players WHERE idPlayer = ?', req.params.id);
            conn.release();
            res.json({ status: 'OK', affectedRows :q.affectedRows });

        } catch (e){
            res.json({ status: 'NOT OK' });
        }

    });

    apiRouter.route('/teams').get(async function(req,res){

        try {

            let conn = await pool.getConnection();
            let rows = await conn.query('select * from teams');
            conn.release();
            res.json(rows);

        } catch (e){
            console.log(e);
            return res.json({"code" : 100, "status" : "Error with query"});

        }


    }).post(async function(req,res){

        const team = {
            idTeam : req.body.idTeam,
            name : req.body.name,
            userId : req.body.userId,
            points : req.body.points,
        };

        try {

            let conn = await pool.getConnection();
            let q = await conn.query('INSERT INTO teams SET ?', team);
            conn.release();
            res.json({ status: 'OK', insertId:q.insertId });

        } catch (e){
            console.log(e);
            res.json({ status: 'NOT OK' });
        }



    });

    apiRouter.route('/userteam').get(async function(req,res){

        try {

            let conn = await pool.getConnection();
            let rows = await conn.query('select * from teams_has_players');
            conn.release();
            res.json(rows);

        } catch (e){
            console.log(e);
            return res.json({"code" : 100, "status" : "Error with query"});

        }


    }).post(async function(req,res){
        const userTeam = {
            teamId : req.body[0].teamId,
            playerId : req.body[0].playerId,
        };
        const userTeam1 = {
            teamId : req.body[1].teamId,
            playerId : req.body[1].playerId,
        };
        const userTeam2 = {
            teamId : req.body[2].teamId,
            playerId : req.body[2].playerId,
        };
        const userTeam3 = {
            teamId : req.body[3].teamId,
            playerId : req.body[3].playerId,
        };
        const userTeam4 = {
            teamId : req.body[4].teamId,
            playerId : req.body[4].playerId,
        };
        const userTeam5 = {
            teamId : req.body[5].teamId,
            playerId : req.body[5].playerId,
        };
        const userTeam6 = {
            teamId : req.body[6].teamId,
            playerId : req.body[6].playerId,
        };

        try {

            let conn = await pool.getConnection();
            let q1 = await conn.query('INSERT INTO teams_has_players SET ?', userTeam);
            let q2 = await conn.query('INSERT INTO teams_has_players SET ?', userTeam1);
            let q3 = await conn.query('INSERT INTO teams_has_players SET ?', userTeam2);
            let q4 = await conn.query('INSERT INTO teams_has_players SET ?', userTeam3);
            let q5 = await conn.query('INSERT INTO teams_has_players SET ?', userTeam4);
            let q6 = await conn.query('INSERT INTO teams_has_players SET ?', userTeam5);
            let q7 = await conn.query('INSERT INTO teams_has_players SET ?', userTeam6);
            conn.release();
            res.json({ status: 'OK', insertId:q1.insertId,  
            insertId:q2.insertId,
            insertId:q3.insertId,
            insertId:q4.insertId,
            insertId:q5.insertId,
            insertId:q6.insertId,
            insertId:q7.insertId,
                        });
        } catch (e){
            console.log(e);
            res.json({ status: 'NOT OK' });
        }
    });

    apiRouter.route('/leagues').get(async function(req,res){

        try {

            let conn = await pool.getConnection();
            let rows = await conn.query('SELECT * FROM fantasy_leagues');
            conn.release();
            res.json(rows);

        } catch (e){
            console.log(e);
            return res.json({"code" : 100, "status" : "Error with query"});

        }


    }).post(async function(req,res){

        const league = {
            idFl : req.body.idFl,
            name : req.body.name,
            code : req.body.code
        };

        try {

            let conn = await pool.getConnection();
            let q = await conn.query('INSERT INTO fantasy_leagues SET ?', league);
            conn.release();
            res.json({ status: 'OK', insertId:q.insertId });

        } catch (e){
            console.log(e);
            res.json({ status: 'NOT OK' });
        }



    });


    apiRouter.route('/userleagues').get(async function(req,res){

        try {

            let conn = await pool.getConnection();
            let rows = await conn.query('SELECT * FROM users_has_fl');
            conn.release();
            res.json(rows);

        } catch (e){
            console.log(e);
            return res.json({"code" : 100, "status" : "Error with query"});

        }


    }).post(async function(req,res){

        const userLeague = {
            userId : req.body.userId,
            fleagueId : req.body.fleagueId
        };

        try {

            let conn = await pool.getConnection();
            let q = await conn.query('INSERT INTO users_has_fl SET ?', userLeague);
            conn.release();
            res.json({ status: 'OK', insertId:q.insertId });

        } catch (e){
            console.log(e);
            res.json({ status: 'NOT OK' });
        }



    });

    apiRouter.route('/leagues/:id').get(async function(req,res){

        try {

            let conn = await pool.getConnection();
            let rows = await conn.query('SELECT u.username, t.name, t.points FROM teams t JOIN users u ON t.userId = u.idUser JOIN users_has_fl ufl ON u.idUser = ufl.userId WHERE ufl.fleagueId =?',req.params.id);
            conn.release();
            res.json(rows);

        } catch (e){
            console.log(e);
            return res.json({"code" : 100, "status" : "Error with query"});

        }
        
    });

    apiRouter.route('/teams/:name').get(async function(req,res){

        try {

            let conn = await pool.getConnection();
            let rows = await conn.query('SELECT p.*, c.name AS clubName, rl.name AS leagueName FROM players p JOIN teams_has_players tp ON p.idPlayer = tp.playerId JOIN teams t ON tp.teamId = t.idTeam JOIN clubs c ON p.clubId = c.idClub JOIN real_leagues rl ON c.LeagueId = rl.idRealLeague WHERE t.name = ?',req.params.name);
            conn.release();
            res.json(rows);

        } catch (e){
            console.log(e);
            return res.json({"code" : 100, "status" : "Error with query"});

        }



    });

    apiRouter.route('/allPlayers').get(async function(req,res){

        try {

            let conn = await pool.getConnection();
            let rows = await conn.query('SELECT p.idPlayer, p.firstName, p.lastName, p.position, p.playerPrice, c.name AS clubName, rl.name AS leagueName, p.goals, p.assists, p.avg_rating, p.cleanSheets, p.totalPoints FROM players p JOIN clubs c ON p.clubId = c.idClub JOIN real_leagues rl ON c.LeagueId = rl.idRealLeague ORDER BY p.firstName');
            conn.release();
            res.json(rows);

        } catch (e){
            console.log(e);
            return res.json({"code" : 100, "status" : "Error with query"});

        }


    });

    apiRouter.route('/allPlayers/:id').get(async function(req,res){

        try {
            let conn = await pool.getConnection();
            let rows = await conn.query('SELECT p.idPlayer, p.firstName, p.lastName, p.position, p.playerPrice, c.name AS clubName, rl.name AS leagueName, p.goals, p.assists, p.avg_rating, p.cleanSheets, p.totalPoints FROM players p JOIN clubs c ON p.clubId = c.idClub JOIN real_leagues rl ON c.LeagueId = rl.idRealLeague WHERE p.idPlayer = ? ORDER BY p.firstName', req.params.id);
            conn.release();;
            res.json(rows);

        } catch (e){
            console.log(e);
            return res.json({"code" : 100, "status" : "Error with query"});

        }


    });

    apiRouter.route('/clubs').get(async function(req,res){

        try {

            let conn = await pool.getConnection();
            let rows = await conn.query('SELECT * FROM clubs');
            conn.release();
            res.json(rows);

        } catch (e){
            console.log(e);
            return res.json({"code" : 100, "status" : "Error with query"});

        }


    });

    apiRouter.route('/realleagues').get(async function(req,res){

        try {

            let conn = await pool.getConnection();
            let rows = await conn.query('SELECT * FROM real_leagues');
            conn.release();
            res.json(rows);

        } catch (e){
            console.log(e);
            return res.json({"code" : 100, "status" : "Error with query"});

        }


    })

    

    return apiRouter;


};
