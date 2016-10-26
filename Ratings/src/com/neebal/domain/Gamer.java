/**
 * 
 */
package com.neebal.domain;


/**
 * @author root
 *
 */
public class Gamer {

	private long id;
	private String name;
	private String email;
	private int score;
	private int time;
	
	
	public Gamer() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Gamer(long id, String name, String email, int score, int time) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.score = score;
		this.time = time;
	}
	public long getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public String getEmail() {
		return email;
	}
	public int getScore() {
		return score;
	}
	public int getTime() {
		return time;
	}
	
}
