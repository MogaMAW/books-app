package com.example.BooksBackend.Orders;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponse {

    @JsonProperty("id")
    private Long id;
    @JsonProperty("user_id")
    private Long user_id;
    @JsonProperty("status")
    private String status;
    @JsonProperty("createdAt")
    private String createdAt;
    @JsonProperty("updatedAt")
    private String updatedAt;


    public void setId( Long id) {
        this.id = id;
    }
    public void setUserId( Long id) {
        this.user_id = id;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt =  createdAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt =  updatedAt;
    }
}
