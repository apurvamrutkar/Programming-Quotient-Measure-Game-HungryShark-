package com.neebal.admin;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neebal.db.util.DatabaseConnection;
import com.neebal.domain.Gamer;

/**
 * Servlet implementation class AdminViewServlet
 */
@WebServlet("/adminView")
public class AdminViewServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public AdminViewServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

		try {
			Connection connection = DatabaseConnection.getConnection();

			String sql = "Select * from Gamers";
			PreparedStatement preparedStatement = connection
					.prepareStatement(sql);
			ResultSet resultSet = preparedStatement.executeQuery();

			List<Gamer> gamers = new ArrayList<Gamer>();

			while (resultSet.next()) {
				gamers.add(new Gamer(resultSet.getLong(1), resultSet.getString(2),
						resultSet.getString(3), resultSet.getInt(4), resultSet
								.getInt(5)));
			}
			
			request.setAttribute("gamers", gamers);
			
			RequestDispatcher requestDispatcher = request.getRequestDispatcher("/Result.jsp");
			requestDispatcher.forward(request, response);

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
