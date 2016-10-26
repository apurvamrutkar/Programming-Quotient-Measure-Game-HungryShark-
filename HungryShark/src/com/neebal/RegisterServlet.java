package com.neebal;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Arrays;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


/**
 * Servlet implementation class RegisterServlet
 */
@WebServlet("/register")
public class RegisterServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	/**
	 * 
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		int score = Integer.parseInt(request.getParameter("score"));
		//int userTime = Integer.parseInt(request.getParameter("time"));
		int livesLost = Integer.parseInt(request.getParameter("life"));
		String levelArray = request.getParameter("levelArray");
		//String levelTime[] = request.getParameterValues("levelTime");
		Float flawPositionTime = Float.parseFloat(request.getParameter("flawPositionTime"));
		String totalFish[] = request.getParameterValues("totalFish");
		String userFish[] = request.getParameterValues("userFish");
		String totalObstacle[] = request.getParameterValues("totalObstacle");
		String userHitObstacle[] = request.getParameterValues("userHitObstacle");
		int userPatternScore = Integer.parseInt(request.getParameter("patternScore")); 
		int totalPatternsDisplayed = Integer.parseInt(request.getParameter("totalPatternsDisplayed"));
		
		
				
		HttpSession session = request.getSession();
		String name = (String) session.getAttribute("name");
		String email =(String) session.getAttribute("email");
		
		request.setAttribute("totalFishes", totalFish);
		request.setAttribute("userFishes", userFish);
		request.setAttribute("totalObstacles", totalObstacle);
		request.setAttribute("userObstacles", userHitObstacle);
		request.setAttribute("totalScore", score);
		
		//System.out.println(name+" "+score+" "+userTime+" "+totalPatternsDisplayed);
		try {

			Connection connection = DatabaseConnection.getConnection();
			String sql = "Insert into Gamers(name, email, score, livesLost, flaw_time) VALUES(?,?,?,?,?)";
			PreparedStatement preparedStatement = connection.prepareStatement(sql);
			preparedStatement.setString(1, name);
			preparedStatement.setInt(3, score);
			preparedStatement.setString(2, email);
			preparedStatement.setInt(4, livesLost);
			preparedStatement.setFloat(5, flawPositionTime);
			preparedStatement.executeUpdate();
			
			
			
			sql = "Select id from Gamers where email = ?";
			preparedStatement = connection.prepareStatement(sql);
			preparedStatement.setString(1, email);
			ResultSet resultSet =  preparedStatement.executeQuery();
			resultSet.next();
			int gamerId = resultSet.getInt("id");
			System.out.println(gamerId);
			
			sql = "Insert into LevelTimeData VALUES(?";
			for (int i = 0; i < 44; i++) {
				sql+=",?";
			}
			sql+=")";
			preparedStatement = connection.prepareStatement(sql);
			preparedStatement.setInt(1, gamerId);
			//System.out.println(levelArray);
			String[] levelTime = levelArray.split(",");
			//System.out.println(levelTime.length+" "+Arrays.toString(levelTime));
			for (int i = 0; i <44; i++) {
				preparedStatement.setInt(i+2, Integer.parseInt(levelTime[i]));
			}
			
			System.out.println(preparedStatement.toString());
			preparedStatement.executeUpdate();
			
			sql = "Insert into resources_provided(gamer_id, greenFishes, pinkFishes, megaFishes, redFishes, blueFishes"
					+ ", goldFishes, fighterSharks, arrows, stones, nets, patterns) values"
					+ "(?,?,?,?,?,?,?,?,?,?,?,?)";
			
			preparedStatement = connection.prepareStatement(sql);
			preparedStatement.setInt(1, gamerId);
			preparedStatement.setInt(2, Integer.parseInt(totalFish[0]));
			preparedStatement.setInt(3, Integer.parseInt(totalFish[1]));
			preparedStatement.setInt(4, Integer.parseInt(totalFish[2]));
			preparedStatement.setInt(5, Integer.parseInt(totalFish[3]));
			preparedStatement.setInt(6, Integer.parseInt(totalFish[4]));
			preparedStatement.setInt(7, Integer.parseInt(totalFish[5]));
			preparedStatement.setInt(8, Integer.parseInt(totalFish[6]));
			preparedStatement.setInt(9, Integer.parseInt(totalObstacle[1]));
			preparedStatement.setInt(10, Integer.parseInt(totalObstacle[0]));
			preparedStatement.setInt(11, Integer.parseInt(totalObstacle[2]));
			preparedStatement.setInt(12, totalPatternsDisplayed);
			//System.out.println(preparedStatement);
			preparedStatement.executeUpdate();
			
			

			sql = "Insert into resources_collected(gamer_id, greenFishes, pinkFishes, megaFishes, redFishes, blueFishes"
					+ ",goldFishes, fighterSharks, arrows, stones, nets, patterns) values"
					+ "(?,?,?,?,?,?,?,?,?,?,?,?)";
			
			preparedStatement = connection.prepareStatement(sql);
			preparedStatement.setInt(1, gamerId);
			preparedStatement.setInt(2, Integer.parseInt(userFish[0]));
			preparedStatement.setInt(3, Integer.parseInt(userFish[1]));
			preparedStatement.setInt(4, Integer.parseInt(userFish[2]));
			preparedStatement.setInt(5, Integer.parseInt(userFish[3]));
			preparedStatement.setInt(6, Integer.parseInt(userFish[4]));
			preparedStatement.setInt(7, Integer.parseInt(userFish[5]));
			preparedStatement.setInt(8, Integer.parseInt(userFish[6]));
			preparedStatement.setInt(9, Integer.parseInt(userHitObstacle[1]));
			preparedStatement.setInt(10, Integer.parseInt(userHitObstacle[0]));
			preparedStatement.setInt(11, Integer.parseInt(userHitObstacle[2]));
			preparedStatement.setInt(12, userPatternScore);
			preparedStatement.executeUpdate();
			
			session.setAttribute("id", gamerId);
			
			
			
			RequestDispatcher requestDispatcher = request.getRequestDispatcher("/Score.jsp");
			requestDispatcher.forward(request, response);
			
			
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("Could not connect to database");
			RequestDispatcher requestDispatcher = request.getRequestDispatcher("/Score.jsp");
			requestDispatcher.forward(request, response);
		}
		
	
	}

}
