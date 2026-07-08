% [section-1]
% Not needed in Matlab, this is the imports section in Python
% [section-2]
function two_body_relative_numerical_solution
    G = 6.67430e-20; % km^3/(kg * s^2)
    m1 = 5.97219e24; % kg
    m2 = 1000; % kg
    mu = G * m1; % km^3/s^2
    RE = 6378.12; % km

    r0 = [8000 0 6000]; % km
    v0 = [0 7 0]; % km/s
    Y0 = [r0 v0];

    % [section-3]
    function Ydot = relative_motion(t,Y)
        rvector = Y(1:3);
        vvector = Y(4:6);
        r = norm(rvector);
        avector = -mu .* rvector ./ r.^3;
        Ydot = [vvector; avector];
    end
    % [section-4]
    t0 = 0; % seconds
    tf = 14709; % seconds, period of one orbit
    [t,Y] = ode45(@relative_motion, [t0, tf], Y0);

    rvec = Y(:, 1:3);
    vvec = Y(:, 4:6);

    % [section-5]
    rmag = vecnorm(rvec,2,2);
    altitude = rmag - RE;
    speed = vecnorm(vvec,2,2);

    % [section-6]
    [min_altitude, imin] = min(altitude);
    [max_altitude, imax] = max(altitude);
    
    speed_at_min_alt = speed(imin);
    speed_at_max_alt = speed(imax); 
    time_at_min_alt = t(imin);
    time_at_max_alt = t(imax);    
    
    % [section-7]
    fprintf('The minimum altitude during the orbit is: %8.2f km\n', min_altitude)
    fprintf('The speed at the minimum altitude is: %8.2f km/s\n', speed_at_min_alt)
    fprintf('The time at minimum altitude is: %8.2f s\n', time_at_min_alt)
    fprintf('The maximum altitude during the orbit is: %8.2f km\n', max_altitude)
    fprintf('The speed at the maximum altitude is: %8.2f km/s\n', speed_at_max_alt)
    fprintf('The time at maximum altitude is: %8.2f s\n', time_at_max_alt)

    % [section-8]
    figure()
    [xx, yy, zz] = sphere(200);
    surf(RE*xx, RE*yy, RE*zz)
    colormap(light_blue)
    caxis([-RE/100 RE/100])
    shading interp

    %   Draw and label the X, Y and Z axes
    line([0 2*RE], [0 0], [0 0]);
    text(2*RE + RE/10, 0, 0, 'x')
    line([0 0], [0 2*RE], [0 0]);
    text(0, 2*RE + RE/10, 0, 'y')
    line([0 0], [0 0], [0 2*RE]);
    text(0, 0, 2*RE + RE/10, 'z')

    hold on
    plot3(rvec(:,1), rvec(:,2), rvec(:,3), 'k')
    plot3(rvec(imin,1), rvec(imin,2), rvec(imin,3), '.r')
    text(rvec(imin,1), rvec(imin,2), rvec(imin,3), 'Min. Altitude')
    plot3(rvec(imax,1), rvec(imax,2), rvec(imax,3), '.g')
    text(rvec(imax,1), rvec(imax,2), rvec(imax,3), 'Max. Altitude')

    view([1,1,.4])

    %   Specify some properties of the graph
    grid on
    axis equal
    xlabel('km')
    ylabel('km')
    zlabel('km')
 
    function map = light_blue
        r = 0.8; g = r; b = 1.0;
        map = [r g b
               0 0 0
               r g b];
    end

    % [section-9]
    return
    
end

