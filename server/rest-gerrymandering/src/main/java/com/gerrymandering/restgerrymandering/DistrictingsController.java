package com.gerrymandering.restgerrymandering;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileReader;
import java.io.InputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

/* https://www.baeldung.com/spring-boot-react-crud following this tutorial
https://www.split.io/blog/tutorial-spring-boot-react/
https://www.baeldung.com/spring-boot-json
https://www.baeldung.com/spring-bean*/

/* Spring uses inversion of control, so dependencies can be defined without instantiating them
A bean is an object that is instantiated, assembled, and otherwise managed by a Spring IoC container.
An object can retrieve dependencies from the IoC container by providing it with appropriate configuration metadata.
This makes it easy to handle managing cases where we want shared instances of an object shared across the application
or separate instances for each use case.
 */

/* The RestController annotation indicates to Spring that this is a controller class, it tells Spring to write the
return type of the GET method to the response body*/
// Defines endpoint that receives requests at /states

    //@CrossOrigin("http://localhost:3000")
// In Spring, HTTP requests are handled by a controller
/* The class-level annotation maps a specific request path or pattern onto a controller. You can then
apply additional method-level annotations to make mappings more specific to handler methods.*/
@RestController
@RequestMapping("/districtings")
public class DistrictingsController {

    /*
    @Repository is a Spring annotation that indicates that the decorated class is a repository. A repository is a
     mechanism for encapsulating storage, retrieval, and search behavior which emulates a collection of objects.
     It is a specialization of the @Component annotation allowing for implementation classes to be autodetected
     through classpath scanning.
     */
    @Autowired
    private final DistrictingRepository repository;

    public DistrictingsController(DistrictingRepository repository) {
        this.repository = repository;
    }

    /*@GetMapping
    public List<Districting> getDistrictings() {
        return repository.findAll();
    }*/

    /*@GetMapping("/{id}")
    public Districting getDistricting(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(RuntimeException::new);
    }*/

    @GetMapping("/geojson")
    public JSONObject getGeoJSONData(@RequestParam String state) {
        JSONParser parser = new JSONParser();
        try (FileReader reader = new FileReader("src/main/resources/data/" + state.toUpperCase()
                + "_Congressional_Districts_2020.json")) {
            return (JSONObject) parser.parse(reader);
        }
        catch (Exception e) {
            System.out.println("Error.");
        }
        return null;
    }

    @GetMapping("/stats")
    public JSONObject getStats(@RequestParam String state) {
        JSONParser parser = new JSONParser();
        try (FileReader reader = new FileReader("src/main/resources/data/" + state.toUpperCase()
                + "_Congressional_Districts_2020.json")) {
            return (JSONObject) parser.parse(reader);
        }
        catch (Exception e) {
            System.out.println("Error.");
        }
        return null;
    }

    /*@PostMapping
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
    }*/
}
