package com.neebal;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class FeedBackServlet
 */
@WebServlet("/feedback")
public class FeedBackServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FeedBackServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String easeoflearning = request.getParameter("easeLearn");
		String gamedecisions = request.getParameter("gameDecisions");
		String interactivity = request.getParameter("interactivity");
		String fun = request.getParameter("fun");
		String difficulties = request.getParameter("difficulties");
		String playAgain = request.getParameter("playAgain");
		String favorite_part = request.getParameter("favorite_part");
		String suggestions = request.getParameter("suggestions");
		String comments = request.getParameter("comments");
		
		HttpSession session = request.getSession();
		int gamer_id = (int) session.getAttribute("id");
		try {
			Connection connection = DatabaseConnection.getConnection();
			String sql = "Insert into feedback (gamer_id,ease_of_learning,"
					+ "game_decisions,interactivity,"
					+ "fun,difficulty_textarea,"
					+ "play_again, favorite_part,"
					+ "suggestions, comments) values (?,?,?,?,?,?,?,?,?,?)";
			
			PreparedStatement preparedStatement = connection.prepareStatement(sql);
			preparedStatement.setLong(1, gamer_id);
			preparedStatement.setString(2, easeoflearning);
			preparedStatement.setString(3, gamedecisions);
			preparedStatement.setString(4, interactivity);
			preparedStatement.setString(5, fun);
			preparedStatement.setString(6, difficulties);
			preparedStatement.setString(7, playAgain);
			preparedStatement.setString(8, favorite_part);
			preparedStatement.setString(9, suggestions);
			preparedStatement.setString(10, comments);
			
			preparedStatement.executeUpdate();
			session.invalidate();
			response.sendRedirect("/HungryShark/index.html");
			
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
