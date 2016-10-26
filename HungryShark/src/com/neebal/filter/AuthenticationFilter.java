package com.neebal.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet Filter implementation class AuthenticationFilter
 */
@WebFilter("/authenticateFilter")
public class AuthenticationFilter implements Filter {

    /**
     * Default constructor. 
     */
    public AuthenticationFilter() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
		String[] allowedUrls = { "","index.html","sessionStart","main.js","phaser.min.js"};
		HttpSession session = req.getSession(false);

		String uri = req.getRequestURI();
		//System.out.println(uri);
		boolean allowed=false;
		if (session == null) {
			for (int i = 0; i < allowedUrls.length; i++) {
				if (uri.endsWith(allowedUrls[i])) {
					allowed = true;
					break;
				}
			}
			if (!allowed) {
				System.out.println("unauthorized");
				res.sendRedirect("/FishPond/index.html");
			} else {
				chain.doFilter(request, response);
			}
		} else {
			// pass the request along the filter chain
			chain.doFilter(request, response);
		}
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

}
