package com.neebal.admin;

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

import com.neebal.db.util.DatabaseConnection;

/**
 * Servlet implementation class CalculateRatingsServlet
 */
@WebServlet("/calculateRatings")
public class CalculateRatingsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public CalculateRatingsServlet() {
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
		Connection connection;
		try {
			connection = DatabaseConnection.getConnection();

			long id = Long.parseLong(request.getParameter("id"));
			String name = request.getParameter("name");
			// int score = Integer.parseInt(request.getParameter("score"));
			int totalTime =220;//Integer.parseInt(request.getParameter("time"));
			int scoreProvided = 0, healthIncreaseProvided = 0, healthDecreaseProvided = 0, patternProvided = 0;
			int scoreCollected = 0, healthIncreaseCollected = 0, healthDecreaseCollected = 0, patternCollected = 0;
			Integer[] levelArray =new Integer[44];
			int livesLost = 0;
			
			String sql = "select * from resources_provided where gamer_id = ?";
			PreparedStatement preparedStatement = connection
					.prepareStatement(sql);

			preparedStatement.setLong(1, id);
			ResultSet resultSet = preparedStatement.executeQuery();

			if (resultSet.next()) {
				scoreProvided = resultSet.getInt(2) + 2 * resultSet.getInt(3)
						+ 3 * resultSet.getInt(4) + 6 * resultSet.getInt(12);
				healthIncreaseProvided = resultSet.getInt(6) + 4
						* resultSet.getInt(7);
				healthDecreaseProvided = 2 * resultSet.getInt(5) + 4
						* resultSet.getInt(8) + resultSet.getInt(9) + 2
						* resultSet.getInt(10) + 4 * resultSet.getInt(11);
				patternProvided = resultSet.getInt(12);
			} else {
				throw new Exception("Invalid Id");
			}

			sql = "select * from resources_collected where gamer_id = ?";
			preparedStatement = connection.prepareStatement(sql);

			preparedStatement.setLong(1, id);
			resultSet = preparedStatement.executeQuery();

			if (resultSet.next()) {
				scoreCollected = resultSet.getInt(2) + 2 * resultSet.getInt(3)
						+ 3 * resultSet.getInt(4) + 6 * resultSet.getInt(12);
				;
				healthIncreaseCollected = resultSet.getInt(6) + 4
						* resultSet.getInt(7);
				healthDecreaseCollected = 2 * resultSet.getInt(5) + 4
						* resultSet.getInt(8) + resultSet.getInt(9) + 2
						* resultSet.getInt(10) + 4 * resultSet.getInt(11);
				patternCollected = resultSet.getInt(12);

			} else {
				throw new Exception("Invalid Id");
			}
			
			sql = "select * from Gamers where id = ?";
			preparedStatement = connection.prepareStatement(sql);

			preparedStatement.setLong(1, id);
			resultSet = preparedStatement.executeQuery();

			Float flawTime = 0.0f;
			
			if(resultSet.next()){
				livesLost = resultSet.getInt("livesLost");
				flawTime  = resultSet.getFloat("flaw_time");
				
			}
			else {
				throw new Exception("Invalid Id");
			}
			
			
			sql ="Select * from LevelTimeData where gamer_id=?";
			preparedStatement = connection.prepareStatement(sql);
			preparedStatement.setLong(1, id);
			resultSet = preparedStatement.executeQuery();
			int i=0;
			resultSet.next();
			while(i<44){
				String temp = (i+1)*5 + "sec";
				System.out.println(temp);
				levelArray[i++] = resultSet.getInt(temp);
			}
			
			
			
			//System.out.println("\nUser:" + id + "\nTime: " + totalTime);
			System.out.println("\nCollected:" + "\nScore: " + scoreCollected
					+ "\nhealth increase: " + healthIncreaseCollected
					+ "\nhealth decrease: " + healthDecreaseCollected
					+ "\npattern: " + patternCollected);

			double focus = 10.0 * (4 * patternCollected * 1.0 / patternProvided
									+ 3 * (healthDecreaseProvided - healthDecreaseCollected)
										* 1.0 / healthDecreaseProvided + 3
										* healthIncreaseCollected * 1.0
										/ healthIncreaseProvided);
			
			double accuracy = 100.0 * (scoreCollected * 1.0 / scoreProvided);
			
			double logic =  (3 * accuracy + 7 * focus )/10;
			double adaptability = (livesLost < 2 ? 5 : livesLost < 4 ? 4 : livesLost < 6 ? 3 : livesLost < 8 ? 2 : livesLost<10 ? 1 : 0) * 20;
			
			double flawDetection = flawTime * 120.0 / 220;
			System.out.println(flawDetection);
			double overall_performance = (7*focus + 2*accuracy + 4*logic + 3*adaptability + 4*flawDetection)/20;
			
			request.setAttribute("Name", name);
			Double analysis[] = {logic,adaptability,accuracy,flawDetection,focus,overall_performance};
			request.setAttribute("AnalysisArray", analysis);
			request.setAttribute("levelArray", levelArray);
			RequestDispatcher rd = request.getRequestDispatcher("/AnalysisPage.jsp");
			rd.forward(request, response);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
}
