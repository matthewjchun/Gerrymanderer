package com.gerrymandering.restgerrymandering;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

// https://www.baeldung.com/spring-boot-react-crud following this tutorial
// https://www.split.io/blog/tutorial-spring-boot-react/
// Spring uses inversion of control, so dependencies can be defined without instantiating them

// The RestController annotation indicates to Spring that this is a controller class
// Defines endpoint that receives requests at /states
@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/states")
public class StatesController {

    @Autowired
    private final StateRepository stateRepository;

    public StatesController(StateRepository stateRepository) {
        this.stateRepository = stateRepository;
    }

    @GetMapping
    public List<State> getClients() {
        return stateRepository.findAll();
    }

    @GetMapping("/{id}")
    public State getState(@PathVariable Long id) {
        return stateRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createState(@RequestBody State state) throws URISyntaxException {
        State savedState = stateRepository.save(state);
        return ResponseEntity.created(new URI("/states/" + savedState.getId())).body(savedState);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateState(@PathVariable Long id, @RequestBody State state) {
        State currentState = stateRepository.findById(id).orElseThrow(RuntimeException::new);
        currentState.setName(state.getName());
        currentState = stateRepository.save(state);

        return ResponseEntity.ok(currentState);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteState(@PathVariable Long id) {
        stateRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
