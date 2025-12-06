interface Coord {
    x: number,
    y: number,
}

impl Coord {
    fn max(coords: &[Coord], f: fn(&Coord) -> number) -> Coord {
        coords
            .iter()
            .reduce(|a, b| if f(a) > f(b) { a } else { b })
            .unwrap_or(&Coord(number::MIN, number::MIN))
            .clone()
    }
    fn max_x(coords: &[Coord]) -> number {
        Coord::max(coords, Coord::x).x()
    }
    fn max_y(coords: &[Coord]) -> number {
        Coord::max(coords, Coord::y).y()
    }
    fn is_match(&self, x: number, y: number) -> boolean {
        if (self.x() == x) && (self.y() == y) {
            true
        } else {
            false
        }
    }
}


/// **Decoration Object**
/// - represents a position occupied by board decorations
/// - no player pieces can occupy these positions
/// - if any coordinates duplicate Coord, the decorations will be hidden by the Coords
/// - implemented as a tuple
/// - TODO: add duplication sanity check

interface Decoration {
    coord: Coord,
    value: string,
}


impl Decoration {
    fn max(decors: &[Decoration], f: fn(&Decoration) -> number) -> Decoration {
        decors
            .iter()
            .reduce(|a, b| if f(a) > f(b) { a } else { b })
            .unwrap_or(&Decoration(Coord(number::MIN, number::MIN), ' '))
            .clone()
    }
    fn max_x(decors: &[Decoration]) -> number {
        Decoration::max(decors, Decoration::x).x()
    }
    fn max_y(decors: &[Decoration]) -> number {
        Decoration::max(decors, Decoration::y).y()
    }
    fn is_coord_match(&self, x: number, y: number) -> boolean {
        self.0.is_match(x, y)
    }
}

export interface Board {
    coords: Coord[],
    names: Coord[],
    decors: Decoration[],
    max_x: number,
    max_y: number,
    players: Player[],
    indexes: Indexes[],
    occupied: TokenPos[],
    piece_count: number,
}

impl Disp {
    const SPACING: &'static str = "";
    const DICE_COORD: Coord = Coord(23, 11);
    const MAX_NAME: number = 16;

 

    pub fn build(&mut self, players: Vec<Player>, indexes: Vec<Indexes>) {
        self.players = players;
        self.indexes = indexes;

        //           1         2         3         4
        // 012345678901234567890123456789012345678901234
        // 1  NAME 1----------       ----------NAME 2
        // 2
        // 3          R1      *   *   *       G1
        // 4        R2    *               *     G2
        // 5      R3   *                     *    G3
        // 6    R4   *  *                   *  *    G4
        // 7       *      *               *      *
        // 8                *           *
        // 9      *           *       *           *
        // 0                    +---+
        // 1     *              | D |              *
        // 2                    +---+
        // 3      *           *       *           *
        // 4                *           *
        // 5       *      *               *      *
        // 6    Y1   *  *                   *  *    B1
        // 7      Y2   *                     *    B2
        // 8        Y3    *               *     B3
        // 9          Y4      *   *   *      B4
        // 0
        // 1  NAME 4----------       ----------NAME 3
        // 012345678901234567890123456789012345678901234

        // Path coordinates
        self.coords.push(Coord(12, 5)); // Red Start
        self.coords.push(Coord(15, 4));
        self.coords.push(Coord(19, 3));
        self.coords.push(Coord(23, 3));
        self.coords.push(Coord(27, 3));
        self.coords.push(Coord(31, 4));
        self.coords.push(Coord(34, 5)); // Green End
        self.coords.push(Coord(36, 6)); // Green Start
        self.coords.push(Coord(38, 7));
        self.coords.push(Coord(39, 9));
        self.coords.push(Coord(40, 11));
        self.coords.push(Coord(39, 13));
        self.coords.push(Coord(38, 15));
        self.coords.push(Coord(36, 16)); // Blue End
        self.coords.push(Coord(34, 17)); // Blue Start
        self.coords.push(Coord(31, 18));
        self.coords.push(Coord(27, 19));
        self.coords.push(Coord(23, 19));
        self.coords.push(Coord(19, 19));
        self.coords.push(Coord(15, 18));
        self.coords.push(Coord(12, 17)); // Yellow End
        self.coords.push(Coord(10, 16)); // Yellow Start
        self.coords.push(Coord(8, 15));
        self.coords.push(Coord(7, 13));
        self.coords.push(Coord(6, 11));
        self.coords.push(Coord(7, 9));
        self.coords.push(Coord(8, 7));
        self.coords.push(Coord(10, 6)); // Red End

        // Home Coordinates
        self.coords.push(Coord(5, 6)); // Red
        self.coords.push(Coord(7, 5));
        self.coords.push(Coord(9, 4));
        self.coords.push(Coord(11, 3));
        self.coords.push(Coord(35, 3)); // Green
        self.coords.push(Coord(37, 4));
        self.coords.push(Coord(39, 5));
        self.coords.push(Coord(41, 6));
        self.coords.push(Coord(41, 16)); // Blue
        self.coords.push(Coord(39, 17));
        self.coords.push(Coord(37, 18));
        self.coords.push(Coord(35, 19));
        self.coords.push(Coord(11, 19)); // Yellow
        self.coords.push(Coord(9, 18));
        self.coords.push(Coord(7, 17));
        self.coords.push(Coord(5, 16));

        // Finish Coordiantes
        self.coords.push(Coord(13, 6)); // Red
        self.coords.push(Coord(15, 7));
        self.coords.push(Coord(17, 8));
        self.coords.push(Coord(19, 9));
        self.coords.push(Coord(33, 6)); // Green
        self.coords.push(Coord(31, 7));
        self.coords.push(Coord(29, 8));
        self.coords.push(Coord(27, 9));
        self.coords.push(Coord(33, 16)); // Blue
        self.coords.push(Coord(31, 15));
        self.coords.push(Coord(29, 14));
        self.coords.push(Coord(27, 13));
        self.coords.push(Coord(19, 13)); // Yellow
        self.coords.push(Coord(17, 14));
        self.coords.push(Coord(15, 15));
        self.coords.push(Coord(13, 16));

        // separate vector for decorations (dice border)
        self.decors.push(Decoration(Coord(21, 10), '+'));
        self.decors.push(Decoration(Coord(22, 10), '-'));
        self.decors.push(Decoration(Coord(23, 10), '-'));
        self.decors.push(Decoration(Coord(24, 10), '-'));
        self.decors.push(Decoration(Coord(25, 10), '+'));
        self.decors.push(Decoration(Coord(21, 11), '|'));
        self.decors.push(Decoration(Coord(25, 11), '|'));
        self.decors.push(Decoration(Coord(21, 12), '+'));
        self.decors.push(Decoration(Coord(22, 12), '-'));
        self.decors.push(Decoration(Coord(23, 12), '-'));
        self.decors.push(Decoration(Coord(24, 12), '-'));
        self.decors.push(Decoration(Coord(25, 12), '+'));

        // yet another vector for player names
        // - we take over the entire row for names
        // - simplifies the text justification issues
        self.names.push(Coord(3, 1)); // players 1 and 2
        self.names.push(Coord(3, 21)); // players 3 and 4

        // calculate maximum coordinates (clumsy I know)
        self.max_x = Coord::max_x(&self.coords);
        self.max_y = Coord::max_y(&self.coords);
        let decors_x = Decoration::max_x(&self.decors);
        let decors_y = Decoration::max_y(&self.decors);
        if decors_x > self.max_x {
            self.max_x = decors_x;
        }
        if decors_y > self.max_y {
            self.max_y = decors_y;
        }
        let names_x = Coord::max_x(&self.names);
        let names_y = Coord::max_y(&self.names);
        if names_x > self.max_x {
            self.max_x = names_x;
        }
        if names_y > self.max_y {
            self.max_y = names_y;
        }
    }

    fn slot_index_colour(&self, slot_index: number) -> Colour {
        for player_index in 0..self.indexes.len() {
            let index = &self.indexes[player_index];
            if ((slot_index >= index.home()) && (slot_index < (index.home() + self.piece_count)))
                || ((slot_index >= index.finish())
                    && (slot_index < (index.finish() + self.piece_count)))
                || ((slot_index == index.start()) || (slot_index == index.end()))
            {
                return self.players[player_index].colour();
            }
        }
        Colour::Grey
    }

    fn clear_screen() {
        print!("\x1B[2J\x1B[1;1H");
    }

    fn text(&self, colour: Colour, text: String) {
        match colour {
            Colour::Red => {
                print!("{}", text.red());
            }
            Colour::Green => {
                print!("{}", text.green());
            }
            Colour::Blue => {
                print!("{}", text.blue());
            }
            Colour::Yellow => {
                print!("{}", text.yellow());
            }
            _ => {
                print!("{}", text);
            }
        };
    }

    fn piece(&self, token: &Token) {
        self.text(
            self.players[token.player_index()].colour(),
            format!("{}{}", Disp::SPACING, token.piece_number()).to_string(),
        );
    }

    fn empty_slot(&self, slot_index: number) {
        self.text(
            self.slot_index_colour(slot_index),
            format!("{}*", Disp::SPACING).to_string(),
        );
    }

    fn space(&self) {
        self.text(Colour::Grey, format!("{} ", Disp::SPACING).to_string());
    }

    fn get_input(&self, colour: Colour, msg: String) -> String {
        self.text(colour, format!("{}\n", msg).to_string());
        let mut line = String::new();
        let _b1 = std::io::stdin().read_line(&mut line).unwrap();
        line
    }

    /// TODO: enable user to QUIT
    fn select_move(&self, colour: Colour, options: String, piece_options: &Vec<number>) -> Option<number> {
        loop {
            self.text(
                Colour::Grey,
                format!("The following pieces have valid moves {:?}\n", options).to_string(),
            );
            let input: String =
                self.get_input(colour, "Enter selection and then press ENTER ".to_string());
            let response = input.trim();
            match response {
                "D" => {
                    // TODO: this doesn't work properly once we split client
                    println!("\nDEBUG:\n\n{:?}\n\n", self);
                    continue;
                }
                "S" => {
                    println!("\n\nSKIP MOVE...\n");
                    return None;
                }
                "Q" => {
                    // TODO: this currently just equates to SKIPPING
                    println!("\n\nQUITING...\n");
                    return None;
                }
                _ => match response.parse() {
                    Ok(val) => {
                        if val < number::MAX && piece_options.contains(&val) {
                            return Some(val);
                        }
                    }
                    Err(_err) => continue,
                },
            };
            println!("Piece {} is an invalid option\n", response);
        }
    }

    pub fn piece_move_options(&self, piece_options: &Vec<number>) -> Option<(number, String)> {
        if piece_options.len() > 0 {
            Some((piece_options.len(), format!("{:?} ", piece_options)))
        } else {
            None
        }
    }

    pub fn update(&mut self, occupied: Vec<TokenPos>) {
        self.occupied = occupied;
    }

    pub fn get_move(&self, dice_value: number, colour: Colour, piece_options: Vec<number>) -> Option<number> {
        println!("\n");
        match self.piece_move_options(&piece_options) {
            None => {
                println!(
                    "None of the pieces can move with a dice value of {}",
                    dice_value
                );
                let _x = self.get_input(
                    colour,
                    "You must PASS, press ENTER to continue ".to_string(),
                );
                None
            }
            Some((1, options)) => {
                let _x = self.get_input(
                    colour,
                    format!(
                        "Only piece {} has a valid move, press ENTER to continue",
                        options
                    ),
                );
                Some(piece_options[0])
            }
            Some((_, options)) => self.select_move(colour, options, &piece_options),
        }
    }

    fn moves(&self, move_details: &MoveDetails) {
        let player = self.players[move_details.player_index()].clone();

        if move_details.dice_value() == 0 {
            self.text(
                player.colour(),
                format!(
                    "     Player {} ({}) SKIPPED MOVE\n",
                    player.number(),
                    player.name()
                )
                .to_string(),
            );
        } else {
            self.text(
                player.colour(),
                format!(
                    "     Player {} ({}) moved Piece {} ({} slots)",
                    player.number(),
                    player.name(),
                    move_details.piece_number(),
                    move_details.dice_value()
                )
                .to_string(),
            );

            match move_details.dest_slot_state() {
                SlotState::Occupied(token) => {
                    let captured_player = self.players[token.player_index()].clone();
                    self.text(player.colour(), format!(" ### CAPTURED ").to_string());
                    self.text(
                        captured_player.colour(),
                        format!(
                            "Piece {} of Player {} ({})\n",
                            token.piece_number(),
                            captured_player.number(),
                            captured_player.name(),
                        )
                        .to_string(),
                    );
                }
                SlotState::Vacant => println!(""),
            }
        }
    }

    pub fn player(&self, player: &Player, dice_value: number) {
        self.text(
            player.colour(),
            format!(
                "     TURN: PLAYER {} ({}), DICE: {}\n\n",
                player.number(),
                player.name(),
                dice_value
            )
            .to_string(),
        );
    }

    pub fn page_header(&self, moves: &VecDeque<MoveDetails>) {
        Disp::clear_screen();
        println!("");

        // display moves by remote players
        for move_details in moves {
            self.moves(move_details)
        }
        for _ in moves.len()..5 {
            println!("");
        }
    }

    fn dice(&self, dice_value: number) {
        if dice_value > 0 {
            self.text(Colour::Grey, dice_value.to_string());
        } else {
            self.space(); // dice has not been rolled yet
        }
    }

    /// Display names across row
    /// - right justify the second name
    /// - calculate spacing using self.max_x instead of hard coded '7'
    fn name_row(&self, indexes: (number, number)) {
        let mut post_fill = Disp::MAX_NAME;
        if indexes.0 < self.players.len() {
            let player = &self.players[indexes.0];
            let mut name = player.name();
            name.truncate(Disp::MAX_NAME);
            post_fill = post_fill - name.len();
            self.text(player.colour(), name);
        }
        if indexes.1 < self.players.len() {
            let player = &self.players[indexes.1];
            let mut name = player.name();
            name.truncate(Disp::MAX_NAME);
            let pre_fill = Disp::MAX_NAME - name.len() + 7;
            for _ in 0..(post_fill + pre_fill) {
                self.space();
            }
            self.text(player.colour(), name);
        }
    }

const board = (board: Board, dice_value: number) => {
    for (y = 0; y < board.max_y + 2; y++) {
        for (x = 0; x < board.max_x + 1; x++) {
            // first check if we have a dice coordinate
            if Disp::DICE_COORD.is_match(x, y) {
                board.dice(dice_value);
            } else {
                // next check for a name row
                match board.names.iter().position(|n| n == &Coord(x, y)) {
                    Some(0) => {
                        // first row contains players 1 and 2 (indexes: 0 & 1)
                        board.name_row((0, 1));
                    }
                    Some(_) => {
                        // second row contains players 4 and 3 (indexes: 3 & 2)
                        board.name_row((3, 2));
                    }
                    None => {
                        // then check for slot coordinates
                        match board.coords.iter().position(|c| c == &Coord(x, y)) {
                            Some(index) => {
                                match board.occupied.iter().find(|&tp| tp.slot_index() == index) {
                                    Some(token_pos) => self.piece(&token_pos.token()),
                                    None => board.empty_slot(index),
                                };
                            }
                            None => {
                                // finally check for decorations
                                match board.decors.iter().find(|&d| d.is_coord_match(x, y)) {
                                    Some(decor) => {
                                        board.text(Colour::Grey, decor.char().to_string())
                                    }
                                    // otherwise SPACE
                                    None => board.space(),
                                };
                            }
                        };
                    }
                };
            }
        }
        println!("");
    }
};

const refresh = (board: Board, moves: MoveDetails[], current_player: Player, dice_value: number, is_turn_current: boolean) => {
    // display the page header
    page_header(board, moves);
    if (is_turn_current) {
        // display current player's turn details
        self.player(current_player, dice_value);
    }
    // display the board
    self.board(dice_value);  
};

