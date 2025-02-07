# Function to print the Tic-Tac-Toe board
def print_board(board):
    """Function to print the Tic-Tac-Toe board."""
    print("\n  0   1   2")
    for index, row in enumerate(board):
        print(index, " | ".join(row))
        if index < 2:
            print("  ---+---+---")

# Function to check if a player has won
def check_win(board, player):
    """Function to check if a player has won."""
    # Check rows
    for row in board:
        if row[0] == player and row[1] == player and row[2] == player:
            return True
    # Check columns
    for col in range(3):
        if board[0][col] == player and board[1][col] == player and board[2][col] == player:
            return True
    # Check diagonals
    if board[0][0] == player and board[1][1] == player and board[2][2] == player:
        return True
    if board[0][2] == player and board[1][1] == player and board[2][0] == player:
        return True
    return False

# Function to check if the game is a draw
def check_draw(board):
    """Function to check if the game is a draw."""
    for row in board:
        for cell in row:
            if cell == ' ':
                return False
    return True

# Main function to play Tic-Tac-Toe
def tic_tac_toe():
    """Main function to play Tic-Tac-Toe."""
    print("\n🎉 Welcome to Tic-Tac-Toe! 🎉")
    print("\nPlayer ❌ goes first.\n")

    board = [[' ' for _ in range(3)] for _ in range(3)]
    current_player = '❌'

    while True:
        print_board(board)
        try:
            row = int(input(f"\nPlayer {current_player}, enter the row (0, 1, 2): "))
            col = int(input(f"Player {current_player}, enter the column (0, 1, 2): "))
            if row not in range(3) or col not in range(3):
                print("\n☢️ Invalid input. Please enter numbers between 0 and 2.\n")
                continue
            if board[row][col] != ' ':
                print("\nCell already taken, try again.\n")
                continue
        except ValueError:
            print("\n☢️ Invalid input. Please enter numbers between 0 and 2.\n")
            continue

        board[row][col] = current_player

        if check_win(board, current_player):
            print_board(board)
            print(f"\n🎉 Player {current_player} wins! 🎉\n")
            break

        if check_draw(board):
            print_board(board)
            print("🤝 The game is a draw! 🤝")
            break

        current_player = '⭕' if current_player == '❌' else '❌'

if __name__ == "__main__":
    tic_tac_toe()
