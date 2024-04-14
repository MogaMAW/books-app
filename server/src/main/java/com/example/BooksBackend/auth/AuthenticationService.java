package com.example.BooksBackend.auth;

import com.example.BooksBackend.config.JwtService;
import com.example.BooksBackend.exception.NotAuthorizedException;
import com.example.BooksBackend.token.Token;
import com.example.BooksBackend.token.TokenRepository;
import com.example.BooksBackend.token.TokenType;
import com.example.BooksBackend.user.User;
import com.example.BooksBackend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private final UserRepository repository;
  private final TokenRepository tokenRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;

  public AuthenticationResponse signup(SignUpRequest request) {

    var user = repository.findByEmail(request.getEmail());
    if(user.isPresent()){
      throw new NotAuthorizedException("Email already taken");
    }
    var newUser = User.builder()
        .username(request.getUsername())
        .email(request.getEmail())
        .password(passwordEncoder.encode(request.getPassword()))
        .role(request.getRole())
        .build();
    var savedUser = repository.save(newUser);
    var jwtToken = jwtService.generateToken(newUser);
    saveUserToken(savedUser, jwtToken);

    AuthenticationResponse response = new AuthenticationResponse();
    response.setAccessToken(jwtToken);
    response.setUser(savedUser.getId());
    response.setEmail(savedUser.getEmail());
    response.setUsername(savedUser.getName());
    return response;

  }

  public AuthenticationResponse signin(SignInRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            request.getEmail(),
            request.getPassword()
        )
    );
    var user = repository.findByEmail(request.getEmail())
        .orElseThrow();
    var jwtToken = jwtService.generateToken(user);
    revokeAllUserTokens(user);
    saveUserToken(user, jwtToken);

    AuthenticationResponse response = new AuthenticationResponse();
    response.setAccessToken(jwtToken);
    response.setUser(user.getId());
    response.setEmail(user.getEmail());
    response.setUsername(user.getName());
    return response;
  }

  private void saveUserToken(User user, String jwtToken) {
    var token = Token.builder()
        .user(user)
        .token(jwtToken)
        .tokenType(TokenType.BEARER)
        .expired(false)
        .revoked(false)
        .build();
    tokenRepository.save(token);
  }

  private void revokeAllUserTokens(User user) {
    var validUserTokens = tokenRepository.findAllValidTokenByUser(Math.toIntExact(user.getId()));
    if (validUserTokens.isEmpty())
      return;
    validUserTokens.forEach(token -> {
      token.setExpired(true);
      token.setRevoked(true);
    });
    tokenRepository.saveAll(validUserTokens);
  }

}
