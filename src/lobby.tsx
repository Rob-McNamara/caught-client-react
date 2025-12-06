const lobbyDisplay = (lobby: string[]) => {
    Disp::clear_screen();
    println!("\n\nLOBBY:");

    // display names waiting in lobby
    lobby.forEach((player_name, _) => {
        println!("  " + player_name);
    });
    println!("\n\nWaiting for game to start...\n\n");
};

// TODO: maybe change to 'Select player number to start first'
pub fn lobby_wait(&self) -> boolean {
    let input: String = self.get_input(
        Colour::Grey,
        "Enter 'S' to START, or 'U' to update Lobby ".to_string(),
    );
    match input.trim() {
        "S" => false,
        _ => true,
    }
}
