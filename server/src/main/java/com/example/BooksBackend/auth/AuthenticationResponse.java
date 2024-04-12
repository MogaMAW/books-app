package com.example.BooksBackend.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

  @JsonProperty("access_token")
  private String accessToken;
  @JsonProperty("user_id")
  private Integer user_id;
  @JsonProperty("email")
  private String email;
  @JsonProperty("username")
  private String username;

  public void setUser(Integer id) {
      this.user_id = id;
    }

  public void setEmail(String email) {
    this.email = email;
  }

  public void setUsername(String username) {
    this.username =  username;
  }
}
