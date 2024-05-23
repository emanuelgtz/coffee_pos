package com.app.coffeepos.security.jwt;

import com.app.coffeepos.models.Employee;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {
  private final String secret_key = "3F3956642936DBC736F9F7F6FE8C84C4536C26A6EB3CF8D84B5267E9CF";

  // get the name from the claim. This is before validating the token, this means, we have to create a method in order to validate the token
  public String extractEmail(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  //in this case, this method will help us to validate the token. Thereafter, we have to create a method in order to check if the token is expired.
  public boolean isValid(String token, UserDetails employee) {
    String employeeName = extractEmail(token);
    return (employeeName.equals(employee.getUsername())) && !isTokenExpired(token);
  }

  // We created this in order to get the expiration of the token
  private boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }


  // After this, we have to create the filter
  private Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }


  public <T> T extractClaim(String token, Function<Claims, T> resolver) {
    Claims claims = extractAllClaims(token);
    return resolver.apply(claims);
  }

  private Claims extractAllClaims(String token) {
    return Jwts
            .parser()
            .verifyWith(getSignInKey())
            .build()
            .parseSignedClaims(token)
            .getPayload();
  }

  public String generateToken(Employee employee) {
    String token = Jwts
            .builder()
            .subject(employee.getEmployeeEmail())
            .issuedAt(new Date(System.currentTimeMillis()))
            .expiration(new Date(System.currentTimeMillis() + 180*60*60*1000))
            .signWith(getSignInKey())
            .compact();
    return token;
  }

  private SecretKey getSignInKey() {
    byte[] keyBytes = Decoders.BASE64URL.decode(secret_key);
    return Keys.hmacShaKeyFor(keyBytes);
  }

}
