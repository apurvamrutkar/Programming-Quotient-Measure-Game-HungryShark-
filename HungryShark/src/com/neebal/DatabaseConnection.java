package com.neebal;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Enumeration;
import java.util.Properties;

public class DatabaseConnection {

	public static Connection getConnection() throws Exception{
		String url,username,password;
		url=username=password=null;
		try {
			FileInputStream fin = new FileInputStream("/root/Desktop/hungryShark.properties");
			Properties properties = new Properties();
			if(fin!=null){
				properties.load(fin);
			}else{
				System.out.println("Properties file not found");
				return null;
			}
			

			Enumeration enuKeys = properties.keys();
			while (enuKeys.hasMoreElements()) {
				String key = (String) enuKeys.nextElement();
				switch(key){
				case "Mysql_url":url = properties.getProperty(key);
								break;
				case "Mysql_username":username = properties.getProperty(key);
										break;
				case "Mysql_password":password = properties.getProperty(key);
										break;
				}
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		

		
		
			Class.forName("com.mysql.jdbc.Driver");
		
		try {
			Connection connection = DriverManager.getConnection(url,username,password);
			return connection;
		} catch (SQLException e) {
			e.printStackTrace();
			throw new Exception("Could not connect to database");
		}
		
		
	}
}
