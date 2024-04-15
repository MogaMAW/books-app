package com.example.BooksBackend.Orders;

import com.example.BooksBackend.exception.InternalServerErrorException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    private final ObjectMapper objectMapper;
    protected List<Long> bookIds;


    @PostMapping("/create")
    public ResponseEntity<Order> createOrder(
            @RequestBody OrderCreateRequest request
    ) {
        List<Long> bookIds;

        try {
            this.bookIds = List.of(objectMapper.readValue(request.getBookIds(), Long[].class));
        } catch (Exception e) {
            throw new InternalServerErrorException("Sorry something went wrong");
        }
        Order order = orderService.createOrder(request.getUserId(), this.bookIds);
        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    @PutMapping("/cancel/{orderId}")
    public ResponseEntity<Void> cancelOrder(
            @PathVariable Long orderId
    ) {
        orderService.cancelOrder(orderId);
        return ResponseEntity.ok().build();
    }

//    @GetMapping("/get-by-user/{userId}")

    @GetMapping("/get-by-user")
    public ResponseEntity<List<OrderResponse>> getOrdersByUserId(
            @RequestParam("userId") Long userId
    ) {
        try {
            System.out.println("About to fetch orders...");
            List<OrderResponse> orders = orderService.getOrdersByUserId(userId);
            System.out.println("Fetched orders:::" + orders);
            System.out.println("Finished to fetch orders");
            return new ResponseEntity<>(orders, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Exception thrown:::" + e);
            throw new InternalServerErrorException("Sorry something went wrong");
        }

    }
}
