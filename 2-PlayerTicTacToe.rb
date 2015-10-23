
#### TWO PLAYER TIC TAC TOE BY LARS JOHNSON
#### PLAY AGAINST ANOTHER PERSON: RUBY

class Game

  attr_reader :board, :state

  def initialize (board, state)
    @board = board
    @state = state
    @play = 1
  end

  def showboard
      puts "\n      ======="
      @board.each { |element| puts "       " + element.join(" ").to_s }
      if @state == "X" || @state == "O"
        puts "\n The #{@state}'s Win!"
        puts
        exit!
      elsif @board.flatten.all? { |value| value.is_a?(String) }
        puts "\n This game is a Tie!"
        puts
        exit!
      end
      if @play == 1
        return player_one
      else
        return player_two
      end
  end

  def player_one
    print "\n What is your number X? "
    x = gets.chomp.to_i
    @board.each_index { |row|
      @board[row].each_index { |col|
        @board[row][col] == x ? @board[row][col] = "X" : x = x
      }
    }
    @play = 2
    return status
  end

  def player_two
    print "\n What is your number O? "
    o = gets.chomp.to_i
    @board.each_index { |row|
      @board[row].each_index { |col|
        @board[row][col] == o ? @board[row][col] = "O" : o = o
      }
    }
    @play = 1
    return status
  end

  def status
    @board.each { |row|
      case row
        when ["X","X","X"]
          @state = "X"
        when ["O","O","O"]
          @state = "O"
      end
    }
    @board.transpose.each {|col|
      case col
        when ["X","X","X"]
          @state = "X"
        when ["O","O","O"]
         @state = "O"
      end
    }
      if @board[0][0] == "X" && @board[1][1] == "X" && @board[2][2] == "X"
        @state = "X"
      end
      if @board[0][0] == "O" && @board[1][1] == "O" && @board[2][2] == "O"
        @state = "O"
      end
      if @board[0][2] == "X" && @board[1][1] == "X" && @board[2][0] == "X"
        @state = "X"
      end
      if @board[0][2] == "O" && @board[1][1] == "O" && @board[2][0] == "O"
        @state = "O"
      end
    return showboard
  end

end

go = Game.new([[1,2,3],[4,5,6],[7,8,9]], "")
go.showboard