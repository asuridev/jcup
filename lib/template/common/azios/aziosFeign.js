
const aziosFeign = (summary) =>{

  const { packageName } = summary;

  return `package ${packageName}.common.azios;

import org.springframework.web.bind.annotation.*;

import java.util.List;

public interface Azios<T,I> {

    @GetMapping
    List<T> get();

    @GetMapping("/{id}")
    T  get(@PathVariable("id") I id);

    @PostMapping()
    <S extends T> T post(@RequestBody S element );

    @PatchMapping("/{id}")
    <S extends T> T patch(@RequestBody S element, @PathVariable("id") I id);

    @PutMapping("/{id}")
    <S extends T> T put(@RequestBody S element, @PathVariable("id") I id);

    @DeleteMapping("/{id}")
    void delete(@PathVariable("id") I id);
}

  `;

};


module.exports = {
  aziosFeign
}