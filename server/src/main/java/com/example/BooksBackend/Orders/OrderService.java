package com.example.BooksBackend.Orders;

import com.example.BooksBackend.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderedBookRepository orderedBookRepository;

    // Create an order
    @Transactional
    public Order createOrder(Long userId, List<Long> bookIds) {
        Order order = Order.builder()
                .userId(userId)
                .status("CREATED")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        order = orderRepository.save(order);

        List<OrderedBook> orderedBooks = new ArrayList<>();
        for (Long bookId : bookIds) {
            OrderedBook orderedBook = OrderedBook.builder()
                    .orderId(order.getId())
                    .bookId(bookId)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();
            orderedBooks.add(orderedBook);
        }

        orderedBookRepository.saveAll(orderedBooks);

        return order;
    }

    public List<OrderResponse> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    // Cancel an order
    @Transactional
    public void cancelOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));

        order.setStatus("CANCELLED");
        order.setUpdatedAt(LocalDateTime.now());
        orderRepository.save(order);
    }
}

