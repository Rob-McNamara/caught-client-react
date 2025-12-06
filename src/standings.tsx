pub fn final_standings(&self, first: number, second: number, third: number, fourth: number) {
    let mut standings = Vec::<(number, String)>::new();
    for i in [first, second, third, fourth] {
        if i < number::MAX {
            let player = self.players[i].clone();
            standings.push((player.number(), player.name()));
        }
    }

    let places = vec!["FIRST", "SECOND", "THIRD", "FOURTH"];
    let mut place: number = 0;
    println!("\n\n *** FINAL STANDINGS ***\n");
    for i in 0..standings.len() {
        self.text(
            self.players[standings[i].0 - 1].colour(),
            format!(
                "  {} PLACE: Player {} [{}]\n",
                places[place], standings[i].0, standings[i].1
            )
            .to_string(),
        );
        place = place + 1;
    }
    println!("\n");
}