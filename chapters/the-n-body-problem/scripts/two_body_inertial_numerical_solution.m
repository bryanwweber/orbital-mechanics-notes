function two_body_inertial_numerical_solution
    % [section-1]
    G = 6.67430E-20;  % km^3/(kg * s^2)
    m1 = 1.0E26;  % kg
    m2 = 1.0E26;  % kg

    R10 = [0 0 0];  % km
    R20 = [3000 0 0];  % km
    dotR10 = [10 20 30];  % km/s
    dotR20 = [0 40 0];  % km/s

    y0 = [R10 R20 dotR10 dotR20];

    % [section-2]
    X_1 = y0(1);
    Y_1 = y0(2);
    Z_1 = y0(3);
    X_2 = y0(4);
    Y_2 = y0(5);
    Z_2 = y0(6);

    r = sqrt((X_2 - X_1).^2 + (Y_2 - Y_1).^2 + (Z_2 - Z_1).^2);

    ddotX_1 = G .* m2 .* (X_2 - X_1) ./ r.^3;
    ddotY_1 = G .* m2 .* (Y_2 - Y_1) ./ r.^3;
    ddotZ_1 = G .* m2 .* (Z_2 - Z_1) ./ r.^3;
    ddotX_2 = -G .* m1 .* (X_2 - X_1) ./ r.^3;
    ddotY_2 = -G .* m1 .* (Y_2 - Y_1) ./ r.^3;
    ddotZ_2 = -G .* m1 .* (Z_2 - Z_1) ./ r.^3;

    % [section-3]
    R1 = y0(1:3);
    R2 = y0(4:6);

    r = norm(R2 - R1);
    ddot = G .* (R2 - R1) ./ r.^3;
    ddotR10 = m2 .* ddot;
    ddotR20 = -m1 .* ddot;

    % [section-4]
    Delta_t = 1;  % s
    dotR11 = ddotR10 .* Delta_t + dotR10;
    dotR21 = ddotR20 .* Delta_t + dotR20;

    R11 = dotR10 .* Delta_t + R10;
    R21 = dotR20 .* Delta_t + R20;

    % [section-5]
    % Section 5-6 is needed in Python (imports) but not Matlab
    % [section-6]
    function dydt = absolute_motion(~,y)
        % Calculate the motion of a two-body system in an inertial reference frame.
        %
        % The state vector ``y`` should be in the order:
        %
        % 1. Coordinates of $m_1$
        % 2. Coordinates of $m_2$
        % 3. Velocity components of $m_1$
        % 4. Velocity components of $m_2$

        R1 = y(1:3);
        R2 = y(4:6);

        dotR1 = y(7:9);
        dotR2 = y(10:12);

        r = norm(R2 - R1);

        ddotR1 = G .* m2 .* (R2 - R1) ./ r.^3;
        ddotR2 = G .* m1 .* (R1 - R2) ./ r.^3;

        dydt = [dotR1; dotR2; ddotR1; ddotR2];

    end % absolute_motion

    % [section-7]
    t0 = 0;
    tf = 480;
    [~,y] = ode45(@absolute_motion, [t0 tf], y0);

    R1 = y(:, 1:3); % km
    R2 = y(:, 4:6); % km
    barycenter = (m1 .* R1 + m2 .* R2) ./ (m1 + m2);

    % [section-8]
    output

    return

    function output
        % Plot the output in three graphs
        figure(1)
        title('Motion of two masses in an inertial frame')
        hold on
        plot3(R1(:, 1), R1(:, 2), R1(:, 3), '-r')
        plot3(R2(:, 1), R2(:, 2), R2(:, 3), '-b')
        plot3(barycenter(:, 1), barycenter(:, 2), barycenter(:, 3), '-g')
        axis_settings

        figure(2)
        title('Motion of two masses relative to their barycenter')
        hold on
        R1_rel_COG = R1 - barycenter;
        R2_rel_COG = R2 - barycenter;
        plot3(R1_rel_COG(:, 1), R1_rel_COG(:, 2), R1_rel_COG(:, 3), '-r')
        plot3(R2_rel_COG(:, 1), R2_rel_COG(:, 2), R2_rel_COG(:, 3), '-b')
        plot3(0, 0, 0, 'og')
        axis_settings

        figure(3)
        title('Motion of mass 2 relative to mass 1')
        hold on
        R2_rel_R1 = R2 - R1;
        COG_rel_R1 = barycenter - R1;
        plot3(R2_rel_R1(:, 1), R2_rel_R1(:, 2), R2_rel_R1(:, 3), '-b')
        plot3(COG_rel_R1(:, 1), COG_rel_R1(:, 2), COG_rel_R1(:, 3), '-g')
        plot3(0, 0, 0, 'or')
        axis_settings

        function axis_settings
            view([2,4,1.2])
            grid on
            axis equal
            xlabel('X (km)')
            ylabel('Y (km)')
            zlabel('Z (km)')
        end % axis_settings

    end % output

    % [end-here]

end % two_body_inertial_numerical_solution
