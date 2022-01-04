package com.devcamp.sneaker.controller;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.devcamp.sneaker.entity.Customer;
import com.devcamp.sneaker.entity.Employee;
import com.devcamp.sneaker.entity.Role;
import com.devcamp.sneaker.entity.Token;
import com.devcamp.sneaker.entity.User;
import com.devcamp.sneaker.repository.ICustomerRepository;
import com.devcamp.sneaker.repository.IEmployeeRepository;
import com.devcamp.sneaker.repository.IRolesRepository;
import com.devcamp.sneaker.repository.IUserRepository;
import com.devcamp.sneaker.request.Login;
import com.devcamp.sneaker.request.Signup;
import com.devcamp.sneaker.security.JwtUtil;
import com.devcamp.sneaker.security.UserPrincipal;
import com.devcamp.sneaker.service.TokenService;
import com.devcamp.sneaker.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("users")
public class UserController {
	@Autowired
	private UserService userService;

	@Autowired
	private TokenService tokenService;

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private IUserRepository userRepository;

	@Autowired
	private ICustomerRepository customerRepository;
	
	@Autowired
	private IEmployeeRepository employeeRepository;

	@Autowired
	private IRolesRepository roleRepository;
	
	// register user customer
	@PostMapping("/register/customer")
	public ResponseEntity<Object> register(@Valid @RequestBody Signup signupRequest) {
		User user = userRepository.findByUsername(signupRequest.getUsername());
		Customer customer = customerRepository.findCustomerByPhoneNumber(signupRequest.getPhoneNumber());
		try {
			if (user != null) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("username đã tồn tại");
			} else if (customer != null) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("số điện thoại đã tồn tại");
			} else {
				User userNew = new User();
				userNew.setUsername(signupRequest.getUsername());
				userNew.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
				Set<Role> roleArray = new HashSet<>();
				for (Long roles : signupRequest.getRoles()) {
					Role role = roleRepository.findById(roles).get();
					roleArray.add(role);
				}
				userNew.setRoles(roleArray);
				userNew.setPhotos("assets/img/user/user.jpg");
				userService.createUser(userNew);
				userNew.setCreatedBy(userNew.getId());

				Customer customerNew = new Customer();
				customerNew.setFirstName(signupRequest.getCustomerFirstname());
				customerNew.setLastName(signupRequest.getCustomerLastname());
				customerNew.setPhoneNumber(signupRequest.getPhoneNumber());
				customerNew.setUser(userNew);
				customerRepository.save(customerNew);
				return new ResponseEntity<>(userRepository.save(userNew), HttpStatus.CREATED);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	// register employee
	@PostMapping("/register/employee")
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public ResponseEntity<Object> registerEmployee(@Valid @RequestBody Signup signupRequest) {
		User user = userRepository.findByUsername(signupRequest.getUsername());
		Employee employee = employeeRepository.findEmployeeByEmail(signupRequest.getPhoneNumber());
		try {
			if (user != null) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("username đã tồn tại");
			} else if (employee != null) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("email đã tồn tại");
			} else {
				User userNew = new User();
				userNew.setUsername(signupRequest.getUsername());
				userNew.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
				Set<Role> roleArray = new HashSet<>();
				for (Long roles : signupRequest.getRoles()) {
					Role role = roleRepository.findById(roles).get();
					roleArray.add(role);
				}
				userNew.setRoles(roleArray);
				userNew.setPhotos("assets/img/user/user.jpg");
				userService.createUser(userNew);

				Employee employeeNew = new Employee();
				employeeNew.setFirstName(signupRequest.getCustomerFirstname());
				employeeNew.setLastName(signupRequest.getCustomerLastname());
				employeeNew.setEmail(signupRequest.getPhoneNumber());
				employeeNew.setUser(userNew);
				employeeRepository.save(employeeNew);
				return new ResponseEntity<>(userRepository.save(userNew), HttpStatus.CREATED);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// login
	@PostMapping("/login")
	public ResponseEntity<?> login(@Valid @RequestBody Login loginRequest) {
		try {
			UserPrincipal userPrincipal = userService.findByUsername(loginRequest.getUsername());
			if (null == loginRequest
					|| !new BCryptPasswordEncoder().matches(loginRequest.getPassword(), userPrincipal.getPassword())) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("tài khoản hoặc mật khẩu không chính xác");
			}
			else {
				Token token = new Token();
				token.setToken(jwtUtil.generateToken(userPrincipal));
				token.setTokenExpDate(jwtUtil.generateExpirationDate());
				token.setCreatedBy(userPrincipal.getUserId());
				return new ResponseEntity<>(tokenService.createToken(token).getToken(), HttpStatus.OK);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// change password
	@PostMapping("/change/password/{userId}")
	public ResponseEntity<Object> changePassword(@PathVariable Long userId, @Valid @RequestBody Login loginRequest) {
		try {
			User user = userRepository.findById(userId).get();
			if (user != null && new BCryptPasswordEncoder().matches(loginRequest.getPassword(), user.getPassword())) {
				user.setPassword(new BCryptPasswordEncoder().encode(loginRequest.getPasswordNew()));
				return new ResponseEntity<>(userRepository.save(user), HttpStatus.OK);
			}else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Mật khẩu không chính xác");
			}
			
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// reset password
	@PutMapping("/reset/password/{userId}")
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_EMPLOYEE')")
	public ResponseEntity<Object> resetPassword(@PathVariable Long userId) {
		try {
			User user = userRepository.findById(userId).get();
			if (user != null) {
				user.setPassword(new BCryptPasswordEncoder().encode(user.getUsername()));
				return new ResponseEntity<>(userRepository.save(user), HttpStatus.OK);
			}else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Mật khẩu không chính xác");
			}
			
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// get user by Id
	@GetMapping("/{userId}")
	public ResponseEntity<Object> getUserById(@PathVariable Long userId) {
		try {
			return ResponseEntity.ok(userRepository.findById(userId).get());
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// get user by Id
	@GetMapping("/all")
	public ResponseEntity<Object> getAllUser() {
		try {
			return ResponseEntity.ok(userRepository.findAll());
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// upload photos user
	@PostMapping("/upload/{userId}")
	@ResponseStatus(HttpStatus.CREATED)
	public User uploadPhotoUser(@PathVariable Long userId, @RequestParam MultipartFile image)
			throws IOException {
		Optional<User> user = userRepository.findById(userId);
		String userFolder = user.get().getUsername();
		Path imageUpload = Paths
				.get("/Users/Trung/Documents/GitHub/shop-sneaker/Project Sneaker Shop/assets/img/user/upload/" + userFolder);
		if (!Files.exists(imageUpload)) {
			Files.createDirectories(imageUpload);
		}
		Path file = imageUpload.resolve(image.getOriginalFilename());
		try (OutputStream os = Files.newOutputStream(file)) {
			os.write(image.getBytes());
		}

		User userUpdate = user.get();
		userUpdate.setPhotos("assets/img/user/upload/" + userFolder + "/" + image.getOriginalFilename());
		return userRepository.save(userUpdate);
	}
}
