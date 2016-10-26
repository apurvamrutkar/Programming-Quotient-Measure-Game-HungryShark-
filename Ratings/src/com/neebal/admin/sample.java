package com.neebal.admin;

public class sample {

	public static void main(String[] args) {
		String x="";
		for (int i = 1; i <= 44; i++) {
			x+="'"+(i*5)+" sec',";
		}
		System.out.println(x);
	}

}
